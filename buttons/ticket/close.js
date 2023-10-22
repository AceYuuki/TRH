const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'closeTicket',
    async runInteraction(client, interaction) {
        const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: `${interaction.member.user.username} a décidé de fermer ce ticket ❌` })
            .setDescription('*Pour supprimer définitivement le ticket ou pour rouvrir le ticket, cliquez sur le bouton ci-dessous.*');


    const channel = interaction.guild.channels.cache.get(interaction.channelId);
    if (channel){
        await channel.edit({
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL','SEND_MESSAGES']
                },
                {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }
            ]
        })
    

    var row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('delete-ticket')
            .setLabel('Delete Ticket')
            .setStyle('DANGER')
             );
        
        channel.send({embeds: [embed], components: [row]});
    }
    const fetchGuild = await client.getGuild(interaction.guild);
    const LogsEmbed = new MessageEmbed();
            LogsEmbed.setColor('ORANGE');
            LogsEmbed.setThumbnail(`${interaction.member.user.displayAvatarURL({ format: 'png', dynamic: true })}`)
            LogsEmbed.setTitle(`**__Information sur le ticket de ${channel.name}__**`)
            LogsEmbed.setDescription(`**Informations :**\n**Ticket** : ${channel.name}\n**Action** : Fermeture`)
            const logsTickets = client.channels.cache.find(channel => channel.id === fetchGuild.ticketLog);
            logsTickets.send({ embeds: [LogsEmbed] });
    }
}