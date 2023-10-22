module.exports = {
    name: 'setname',
    category: 'vocalchannel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'setname [channel] [newname]',
    exemples: ['setname [Channel de Yuuki] [Team Yuuki]'],
    description: "te permet de changer le nom d'un channel vocal",
    options: [
        {
            name: 'channel',
            description: 'Mentionne le channel a rename',
            channelType: 'GUILD_VOICE',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'name',
            description: 'nouveau nom du channel',
            type: 'STRING',
            required: true
        },
    ],
    runInteraction(client, interaction) {
        const channel = interaction.options.getChannel('channel');
        const name = interaction.options.getString('name');

        if (channel.type !== 'GUILD_VOICE') {
            return interaction.reply({ content: 'Vous ne pouvez pas changer le nom de ce channel, ce channel doit être un channel vocal !', ephemeral: true });
        }

        const member = interaction.member;
        if (!member || !member.voice.channel || member.voice.channel.id !== channel.id) {
            return interaction.reply({ content: 'Vous devez être dans le channel vocal pour pouvoir changer son nom.', ephemeral: true });
        }

        channel.setName(name);
        return interaction.reply({ content: `Le channel se nomme désormais ${name}` });
    }
}
