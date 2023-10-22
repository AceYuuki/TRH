const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(client, message, settings) {
        const fetchGuild = await client.getGuild(message.guild);
        if (message.partial) {
            try {
                await message.fetch();
            } catch (error) {
                console.error('Error fetching message:', error);
                return;
            }
        }

        if (message.author.bot) {
            const logEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Un embed créé par ${message.author.bot} a été supprimé dans ${message.channel}.`)
                .addField('__Contenu de l\'embed supprimé :__', 'Un embed a été supprimé.');

            const messageChannel = client.channels.cache.get(fetchGuild.messageLog);
            messageChannel.send({ embeds: [logEmbed] });
            return;
        }

        const logEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Un message a été supprimé par ${message.author} dans ${message.channel}.`);

        const cleanedContent = message.content.replace(/```|`/g, '');

        if (message.embeds.length > 0) {
            logEmbed.addField('__Contenu :__', '\`\`\`Un embed a été supprimé.\`\`\`');
        } else {
            logEmbed.addField('__Contenu supprimé :__', `\`\`\`${cleanedContent.trim() !== ''}\`\`\`` ? `\`\`\`${cleanedContent}\`\`\`` : 'Message avec contenu vide.');
        }

        const messageChannel = client.channels.cache.get(fetchGuild.messageLog);
        messageChannel.send({ embeds: [logEmbed] });
    }
};
