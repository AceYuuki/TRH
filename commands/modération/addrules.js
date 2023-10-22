const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('accepter-button')
        .setLabel('〰「✅・Accepter le Règlement')        
        .setStyle('PRIMARY'),

        new MessageButton()
        .setCustomId('refuser-button')
        .setLabel('〰「❌・Refuser le Règlement')        
        .setStyle('SECONDARY'),
        )

module.exports = {
    name: 'addrules',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'addrules',
    exemples: ['addrules'],
    description: 'Permet d\'afficher le reglement et de le valider',
    options: [
        {
            name: 'channel',
            description: 'Le canal à déplacer.',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'color',
            description: 'La couleur de l\'embed (en hexadécimal) ou "default" pour garder la couleur par défaut',
            type: 'STRING',
            required: false,
        },
    ],
    async runInteraction(client, interaction) {
        const channel = interaction.options.getChannel('channel');
        const color = interaction.options.getString('color');
        const fetchGuild = await client.getGuild(interaction.guild);
        const welcomeEmbed = new MessageEmbed()
        .setColor(color)
        .setDescription(`${fetchGuild.rulesText}`)
        .setImage(`${fetchGuild.rulesImage}`)
        await channel.send({embeds: [welcomeEmbed], components: [buttons]});

        interaction.reply({content: `Le règlement a été envoyé dans le canal ${channel}.`, ephemeral: true});
    }
}