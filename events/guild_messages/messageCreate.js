const ownerId = process.env.OWNER_ID;
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        let guildSettings = await client.getGuild(message.guild);

       if (!guildSettings) {
           await client.createGuild(message.guild);
           guildSettings = await client.getGuild(message.guild);
           return message.reply('Le bot a mis à jour la base de données pour votre serveur, retappez la commande !');
       };
       const prefix = guildSettings.prefix;
       if (message.author.bot) return;
       if (!message.content.startsWith(prefix)) return;

       const args = message.content.slice(prefix.length).trim().split(/ +/g);
       const cmdName = args.shift().toLowerCase();
       if (cmdName.length == 0) return;

       let cmd = client.commands.get(cmdName);
       if (!cmd) return message.reply('Cette commande n\'existe pas !');

       if(cmd.ownerOnly) {
           if (message.author.id != ownerId) return message.reply(`La seul personne pouvant utiliser cette commande eet l'owner du bot !`)
       };

        if (!message.member.permissions.has([cmd.permissions])) return message.reply(`Vous n'avez pas la/les permission(s) (\`${cmd.permissions.join(', ')}\`) requise(s) pour effectuer cette commande !`);

       if (cmd) cmd.run(client, message, args, guildSettings);

       if (!message.mentions.has(client.user)) return;
        if (message.mentions.has(client.user)) {
        const mentionEmbed = new MessageEmbed()
        .setDescription(`
       **Bonjour, tu viens à l'instant de me mentionner, voici donc les quelques infos sur moi.**
        
        **__Mon préfixe de commande est:__** \`${prefix}\`
        **__Pour voir toutes les commandes:__** \`${prefix}help\`
        `)
        message.channel.send({embeds: [mentionEmbed]})
    }
    }
}