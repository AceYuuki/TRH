const { MessageEmbed } = require("discord.js");
const { createTranscript } = require('discord-html-transcripts')

module.exports = {
    name: 'delete-ticket',
    async runInteraction(client, interaction) {
        const channel = interaction.guild.channels.cache.get(interaction.channelId);
        channel.delete();
        
        const fetchGuild = await client.getGuild(interaction.guild);
        const LogsEmbed = new MessageEmbed();
            LogsEmbed.setColor('RED');
            LogsEmbed.setThumbnail(`${interaction.member.user.displayAvatarURL({ format: 'png', dynamic: true })}`)
            LogsEmbed.setTitle(`**__Information sur le ticket de ${channel.name}__**`)
            LogsEmbed.setDescription(`**Informations :**\n**Ticket** : ${channel.name}\n**Action** : Suppression`)
            const logsTickets = client.channels.cache.find(channel => channel.id === fetchGuild.ticketLog);
            const transcript = await createTranscript(interaction.channel, {
                limit: -1,
                fileName: `ticket-${interaction.channel.topic}.html`,
                returnBuffer: false,
            })
        logsTickets.send({ embeds: [LogsEmbed], files: [transcript] });

    }
}