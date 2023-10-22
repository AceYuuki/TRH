const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suppcase',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'suppcase [@target] [case]',
    exemples: ['suppcase @Yuukicase'],
    description: 'supprimer les warns d\'une personne',
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur a warn',
            type: 'USER',
            required: true,
        },
        {
            name: 'casenumber',
            description: 'L\'utilisateur a warn',
            type: 'STRING',
            required: true,
        },
        {
            name: 'reason',
            description: 'L\'utilisateur a warn',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction, settings){
        const fetchGuild = await client.getGuild(interaction.guild);
        const caseNumber = interaction.options.getString('casenumber', true);
        const target = interaction.options.getMember('target', true);
        const reason= interaction.options.getString('reason', true);

        const filteredCase = fetchGuild.users.map(u => u.case).indexOf(caseNumber);
        if (filteredCase.length == -1 ){
            return interaction.reply({content: 'Ce warn n\'existe pas.', ephemeral: true});
        }
        fetchGuild.users.splice(filteredCase, 1);
        const embedLog = new MessageEmbed()
        .setAuthor({name:`[UNWARN] N°${caseNumber}`, iconURL: target.displayAvatarURL()})
        .setThumbnail(target.displayAvatarURL())
        .setDescription(`
        **__Utilisateur Unwarn :__** ${target}
        **__Modérateur :__** \`${interaction.member.displayName}\`
        **__Case :__** \`${caseNumber}\`
        **__Raison :__** \`${reason}\`
        `)
        .setColor('#2f3136')
        .setTimestamp()
        const logChannel = client.channels.cache.get(fetchGuild.warnLog);
        logChannel.send({embeds: [embedLog]});
        await client.updateGuild(interaction.guild, { users: fetchGuild.users });

        const embed = new MessageEmbed()
        .setDescription(`Le warn numéro ${caseNumber} a été supprimé`)
        await interaction.reply({embeds: [embed]});
    }
}