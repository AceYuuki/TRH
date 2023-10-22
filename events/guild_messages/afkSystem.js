const ownerId = process.env.OWNER_ID;
const { Message, MessageEmbed } = require('discord.js');
const AFK = require('../../models/afk.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
    if(message.author.bot) return;
    //await AFK.deleteOne({GuildID: guild.id, UserID: message.author.id})
    if(message.mentions.members.size) {
        const Embed = new MessageEmbed()
        .setColor("RED")
        message.mentions.members.forEach((m) => {
            AFK.findOne({GuildID: message.guild.id, UserID: m.id}, async (err, data) => {
                if(err) throw err;
                if(data)
                Embed.setDescription(`
                ${m} est actuellement AFK !
                **__Status:__** **\`${data.Status}\`**
                `);
                return message.reply({embeds: [Embed]});
            });
        })
    }
       
    }
}