const ownerId = process.env.OWNER_ID;

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        let guildSettings = await client.getGuild(interaction.guild);

       if (!guildSettings) {
           await client.createGuild(interaction.guild);
           guildSettings = await client.getGuild(interaction.guild);
           return interaction.reply('Le bot a mis à jour la base de données pour votre serveur, retappez la commande !');
       };
       const { queue } = require('../../utils/musicUtils');
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('Cette commande n\'existe pas !');

            if(cmd.ownerOnly) {
                if (interaction.user.id != ownerId) return interaction.reply(`La seul personne pouvant utiliser cette commande eet l'owner du bot !`)
            };

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({content:`Vous n'avez pas la/les permission(s) (\`${cmd.permissions.join(', ')}\`) requise(s) pour effectuer cette commande !`, ephemeral: true});

            cmd.runInteraction(client, interaction, guildSettings, queue);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId, guildSettings);
            if (!btn) return interaction.reply({content:'Ce bouton n\'existe pas !', ephemeral: true});
            btn.runInteraction(client, interaction);
        }
        
        else if (interaction.isSelectMenu()) {
            const selectMenu = client.selects.get(interaction.customId);
            if (!selectMenu) return interaction.reply({content:'Ce SelectMenu n\'existe pas !', ephemeral:true});
            selectMenu.runInteraction(client, interaction, guildSettings);
        }

    }
}