const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unlock',
    category: 'modération',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: true,
    usage: 'unlock',
    exemples: ['unlock'],
    description: 'unlock un channel',
     async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true});
        await message.reply({ content: "Le salon est dévérouillé !"});
        const embed = new MessageEmbed()
        .setTitle("Salon Dévérouillé")
        .setDescription(`Le salon <#${message.channel.id}> a été verouillé par ${message.member.displayName}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});
    },
    
    async runInteraction(client, interaction){
        const fetchGuild = await client.getGuild(interaction.guild);
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true});
        await interaction.reply({ content: "Le salon est dévérouillé !", ephemeral: true});
        const embed = new MessageEmbed()
        .setTitle("Salon Dévérouillé")
        .setDescription(`Le salon <#${interaction.channel.id}> a été verouillé par ${interaction.member.displayName}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});
    }
}