const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute (client, guild, guildSettings){
        await client.createGuild(guild);
    }
}