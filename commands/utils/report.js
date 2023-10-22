const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'report',
    category: 'utils',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'report',
    exemples: ['report [message]'],
    description: 'rapporter une erreur ou le comportement d\'un membre',
    async run(client, message, args) {
    if (!args[0]) return message.reply('Veuillez indiquer un contenant pour votre sondage !');
   
    const embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setDescription(args.slice(0).join('    '))
    .setTimestamp()

    const reportEmbed = client.channels.cache.get('1098201667909992448');
        reportEmbed.send({embeds: [embed]});

        message.reply('Votre report a bien été envoyé !')
    },

    options: [
        {
            name: 'title',
            description: 'Tapper le titre du sondage',
            type: 'STRING',
            required: true
        },
        {
            name: 'content',
            description: 'Tapper la question du sondage',
            type: 'STRING',
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
    .setTitle(pollTitle)
    .setColor(`#2f3136`)
    .setDescription(pollContent)
    .setTimestamp()
    .setFooter({text: `Report envoyé par : ${interaction.member.user.tag} | ${interaction.member.id}`})

    const reportEmbed = client.channels.cache.get('1098201667909992448');
    reportEmbed.send({embeds: [embed]});
    await interaction.reply({content: 'Votre report a bien été envoyé !', ephemeral: true})
    
    }
}