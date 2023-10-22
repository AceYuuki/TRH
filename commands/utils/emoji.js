const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'emoji',
    category: 'utils',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'emoji',
    exemples: ['emoji'],
    description: 'postez vos emoji',
    async run(client, message, args) {
        //🟥🟩🟦
    const poll = await message.reply('emoji')
    await poll.react('🟥')
    await poll.react('🟩')
    await poll.react('🟦')
    },
    async runInteraction(client, interaction) {
    const poll = await interaction.reply({content: 'emoji', fetchReply: true})
    await poll.react('🟥')
    await poll.react('🟩')
    await poll.react('🟦')
    }
}