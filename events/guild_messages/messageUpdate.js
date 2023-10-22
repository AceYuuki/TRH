const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'messageUpdate',
    once: false,
    async execute(client, oldMessage, newMessage) {
        const fetchGuild = await client.getGuild(newMessage.guild);
        if (oldMessage.author.bot) return;
        const count = 1950;
        const Original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? " ..." : "");
        const Edited = newMessage.content.slice(0, count) + (newMessage.content.length > count ? " ..." : "");

        const logEmbed = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription(`Un [message](${newMessage.url}) a été modifié par ${newMessage.author} dans ${newMessage.channel}.\n
        **__Original__**: \`\`\`${Original}\`\`\`
        **__Modifié__**: \`\`\`${Edited}\`\`\`
        `)

        if (newMessage.attachments.size > 0){
            logEmbed.addField(`Attachement:`, `${newMessage.attachments.map((a) => a.url)}`, true)
        }

        newMessage.guild.channels.cache.get(fetchGuild.messageLog).send({embeds: [logEmbed]});
    }
}