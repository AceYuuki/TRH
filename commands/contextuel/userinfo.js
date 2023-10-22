const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'user-info',
    category: 'contextuel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'Utiliser le menu contextuel de Discord',
    exemples: ['Utiliser le menu contextuel de Discord'],
    type: 'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);
        const embed = new MessageEmbed()
        .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://media.discordapp.net/attachments/832377080737169460/966681522151243806/961722156243374080.png' : 'https://media.discordapp.net/attachments/832377080737169460/966681512944750692/959249290297999422.png'})
        .setColor('BLUE')
        .setImage(member.displayAvatarURL({ format: 'png', dynamic: true }))
        .addFields(
            {name: 'Nom:', value: `${member.displayName}`},
            {name: 'Modérateur:', value: `${member.kickable ? '🔴' : '🟢'}`},
            {name: 'Bot:', value: `${member.user.bot ? '🟢' : '🔴'}`},
            {name: 'Rôles:', value: `${member.roles.cache.map(role => role ).join(', ').replace(', @everyone', ' ')}`},
            {name: 'À créé son compte le:', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
            {name: 'À rejoint le serveur le:', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},
        )
        interaction.reply({ embeds: [embed], ephemeral: true})
    }
}