module.exports = {
    name: 'collector',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'collector',
    exemples: ['collector'],
    description: 'collector',
    async run(client, message, args) {
    const filter = (reaction, user) => {
        return reaction.emoji.name === '❌' && user.id === message.author.id;
    };

    await message.react('❌');

    const collector = message.createReactionCollector({filter , time: 5000});

    collector.on('collect', (reaction, user) => {
        message.channel.send(`${user.tag} a réagi avec ${reaction.emoji.name}`);
      });

    collector.on('end', collected => {
        if (collected.size == 1) message.channel.send("L'auteur du message a réagi !");
        else message.channel.send("L'auteur du message n'a pas réagi !");
      });
    },
    async runInteraction(client, interaction) {
        interaction.reply("Taper le message \`discord\` !");
        const filter = msg => msg.content.includes("discord");
        const collector = interaction.channel.createMessageCollector({filter , time: 5000});

        collector.on('end', collected => {
          interaction.followUp(`${collected.size - 1} messages collectés !`)
        });
    }
}