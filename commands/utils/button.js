const { MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('primary-button')
        .setLabel('Primary')        
        .setStyle('PRIMARY'),

        new MessageButton()
        .setCustomId('secondary-button')
        .setLabel('Secondary')        
        .setStyle('SECONDARY'),

        new MessageButton()
        .setCustomId('success-button')
        .setLabel('Success')        
        .setStyle('SUCCESS'),

        new MessageButton()
        .setCustomId('danger-button')
        .setLabel('Danger')        
        .setStyle('DANGER'),

        new MessageButton()
        .setURL('https://google.com')
        .setLabel('Link')        
        .setStyle('LINK'),
        )



module.exports = {
    name: 'button',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'roles',
    exemples: ['roles'],
    description: 'roles',
    async run(client, message, args) {
        await message.channel.send({content: 'Clique sur les boutons', components: [buttons]});
    },
    async runInteraction(client, interaction) {
        await interaction.reply({content: 'Clique sur les boutons', components: [buttons]});
    }
}