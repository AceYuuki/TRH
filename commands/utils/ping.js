const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping',
    exemples: ['ping'],
    description: 'Affiche la latence du bot et de l\'API',
    async run(client, message, args) {
        const tryPong = await message.channel.send('Calcule de la latence en cours ... ')

        const setupEmbed = new MessageEmbed();
        setupEmbed.setColor('BLUE');
        setupEmbed.setAuthor({ name: `${client.user.username}#${client.user.discriminator}`});
        setupEmbed.addFields(
            {name: 'Latence API', value:`**\`\`\`${client.ws.ping}ms\`\`\`** `, inline: true},
            {name: "Latence BOT", value: `**\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\`**`, inline: true}
        );
        setupEmbed.setThumbnail(`${client.user.displayAvatarURL({ format: 'png', dynamic: true })}`)
        tryPong.edit({content: '  ', embeds: [setupEmbed]});
    },
    async runInteraction(client, interaction) {
        const tryPong = await interaction.reply({ content:'Calcule de la latence en cours ... ', fetchReply: true })
        const setupEmbed = new MessageEmbed();
       setupEmbed.setColor('#2f3136');
        setupEmbed.setAuthor({ name: `${client.user.username}#${client.user.discriminator}`});
        setupEmbed.addFields(
            {name: 'Latence API', value:`**\`\`\`${client.ws.ping}ms\`\`\`** `, inline: true},
            {name: "Latence BOT", value: `**\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\`**`, inline: true}
        );
        setupEmbed.setThumbnail(`${client.user.displayAvatarURL({ format: 'png', dynamic: true })}`)
        interaction.editReply({content: '  ', embeds: [setupEmbed]});
    }
}