const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

const buttons = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setEmoji('🔓')
        .setCustomId('ticket-button')
        .setLabel('Ouvrir un ticket')        
        .setStyle('SUCCESS')
)

module.exports = {
    name: 'panel',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'panel',
    exemples: ['panel'],
    description: 'Affiche un panneau pour ouvrir un ticket',
     async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        const embed = new MessageEmbed()
        .setTitle('> **__Ticket  ⤳  __** `🎐`                   ')
        .setDescription(fetchGuild.panelText)
        .setColor('PURPLE')
        message.channel.send({embeds: [embed], components: [buttons]});
    },
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
        {
            name: 'title',
            description: 'Défini le titre de l\'embed',
            type: 'STRING',
            required: false,
        },
        {
            name: 'image',
            description: 'Défini l\'image de l\'embed',
            type: 'STRING',
            required: false,
        },
    ],
    async runInteraction(client, interaction, guildSettings){
        const channel = interaction.options.getChannel('channel');
        const color = interaction.options.getString('color');
        const title = interaction.options.getString('title');
        const image = interaction.options.getString('image');
        const fetchGuild = await client.getGuild(interaction.guild);
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(fetchGuild.panelText)
            .setColor(color)
            .setImage(image)
            await channel.send({ embeds: [embed], components: [buttons] });
    }
}