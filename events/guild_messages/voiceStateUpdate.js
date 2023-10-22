const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(client, oldState, newState) {
        const fetchGuild = await client.getGuild(newState.guild);

        console.log('Voice State Update:', newState.member.user.tag, oldState.channelID, newState.channelID);

        if (oldState.channelId !== newState.channelId) {
            if (oldState.channelId) {
                const logEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Un utilisateur a quitté le channel vocal.`)
                    .addFields(
                        {name: `__Utilisateur:__`, value: `${oldState.member.toString()}`},
                        {name: `__Channel Quitté :__`, value: `\`\`\`${oldState.channel.name}\`\`\``}
                    )

                const messageChannel = client.channels.cache.get(fetchGuild.voiceLog);
                messageChannel.send({ embeds: [logEmbed] });
            }

            if (newState.channelId) {
                const logEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`Un utilisateur a rejoint le channel vocal.`)
                    .addFields(
                        {name: `__Utilisateur:__`, value: `${newState.member.toString()}`},
                        {name: `__Channel Rejoint :__`, value: `\`\`\`${newState.channel.name}\`\`\``}
                    )

                const messageChannel = client.channels.cache.get(fetchGuild.voiceLog);
                messageChannel.send({ embeds: [logEmbed] });
            }
        }
    }
};
