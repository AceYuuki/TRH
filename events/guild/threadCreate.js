const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread){
        if (thread.isText()) thread.join()
        const logChannel = client.channels.cache.get("958500911364325406");
        logChannel.send(`Nom du thread: ${thread.name}`);
    }
}