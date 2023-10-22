module.exports = {
    name: 'setlimite',
    category: 'vocalchannel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'setlimite [channel] [newlimite]',
    exemples: ['setlimite [Channel de Yuuki] [5]'],
    description: "te permet de changer la limite d'un channel vocal",
    options: [
        {
            name: 'channel',
            description: 'Mentionne le channel a limiter',
            channelType: 'GUILD_VOICE',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'limite',
            description: 'nouvelle limite',
            type: 'NUMBER',
            required: true
        },
    ],
    runInteraction(client, interaction) {
        const channel = interaction.options.getChannel('channel');
        const limite = interaction.options.getNumber('limite');

        if (channel.type !== 'GUILD_VOICE') {
            return interaction.reply({ content: 'Vous ne pouvez pas changer la limite de ce channel, ce channel doit être un channel vocal !', ephemeral: true });
        }

        const member = interaction.member;
        if (!member || !member.voice.channel || member.voice.channel.id !== channel.id) {
            return interaction.reply({ content: 'Vous devez être dans le channel vocal pour pouvoir changer sa limite.', ephemeral: true });
        }

        channel.setUserLimit(limite);
        return interaction.reply({ content: `Le channel vocal peut désormais contenir seulement ${limite} membres` });
    }
}
