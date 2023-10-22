const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roll',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'roll [nombre]',
    exemples: ['roll 100'],
    description: 'roll uun nombre aléatoire',
    async run(client, message, args) {
        const user = message.author;
const messageWords = message.content.split(' ');
const rollFlavor = messageWords.slice(2).join(' ');
  if (messageWords.length === 1) {
    // !roll
    return message.reply(
      (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor
    );
  }

  let sides = messageWords[1]; // !roll 20
  let rolls = 1;
  if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
    // !roll 4d20
    rolls = messageWords[1].split('d')[0] / 1;
    sides = messageWords[1].split('d')[1];
  } else if (messageWords[1][0] == 'd') {
    // !roll d20
    sides = sides.slice(1);
  }
  sides = sides / 1; // convert to number
  if (isNaN(sides) || isNaN(rolls)) {
    return;
  }
  if (rolls > 1) {
    const rollResults = [];
    for (let i = 0; i < rolls; i++) {
      rollResults.push(Math.floor(Math.random()*sides)+1);
    }
    const sum = rollResults.reduce((a,b) => a + b);
    return message.reply(`[${rollResults.toString()}] ${rollFlavor}`);
  } else {
    const embed = new MessageEmbed()
    embed.setColor('#2f3136')
    embed.addFields(
        {name: '╭───────────────•〔🎲〕•───────────────╮', value : '**  **'},
        {name: '__Tu lance les dès ...__', value : '**  **'},
        {name: '──────────────────・仮・────────────────', value : '**  **'},
        {name: 'Et tu as roll : ' + '\`'+(Math.floor(Math.random() * sides) + 1)+ '\`' + ' ' + rollFlavor, value : '**  **'},
        {name: '╰───────────────•〔🎲〕•───────────────╯', value : '**  **'},
    )
    embed.setTimestamp()
    return message.channel.send({ embeds: [embed]});
  }
    },
    options: [
      {
        name: 'number',
        type: 'STRING',
        description: 'Number of sides or rolls (ex. 6 or 2d20)',
        required: true,
      },
      {
        name: 'flavor',
        type: 'STRING',
        description: 'Optional flavor text for the roll',
        required: false,
      },
    ],
    async runInteraction(client, interaction, guildSettings){
      const sidesOrRolls = interaction.options.getString('number');
    const rollFlavor = interaction.options.getString('flavor') || '';

    let sides = sidesOrRolls; // 20 or 4d20
    let rolls = 1;
    if (!isNaN(sidesOrRolls[0] / 1) && sidesOrRolls.includes('d')) {
      // 4d20
      rolls = sidesOrRolls.split('d')[0] / 1;
      sides = sidesOrRolls.split('d')[1];
    } else if (sidesOrRolls[0] === 'd') {
      // d20
      sides = sides.slice(1);
    }
    sides = sides / 1; // convert to number
    if (isNaN(sides) || isNaN(rolls)) {
      return;
    }
    if (rolls > 1) {
      const rollResults = [];
      for (let i = 0; i < rolls; i++) {
        rollResults.push(Math.floor(Math.random() * sides) + 1);
      }
      const sum = rollResults.reduce((a, b) => a + b);
      const embed = new MessageEmbed()
        .setColor('#2f3136')
        .addFields(
          { name: '╭───────────────•〔🎲〕•───────────────╮', value: '**  **' },
          { name: '__You rolled...__', value: '**  **' },
          { name: '──────────────────・仮・────────────────', value: '**  **' },
          { name: 'Results : ' + `[${rollResults.toString()}]`, value: '**  **' },
          { name: `Total : ${sum} ${rollFlavor}`, value: '**  **' },
          { name: '╰───────────────•〔🎲〕•───────────────╯', value: '**  **' },
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor('#2f3136')
        .addFields(
          { name: '╭───────────────•〔🎲〕•───────────────╮', value: '**  **' },
          { name: '__You rolled...__', value: '**  **' },
          { name: '──────────────────・仮・────────────────', value: '**  **' },
          {
            name: `Result : ${Math.floor(Math.random() * sides) + 1} ${rollFlavor}`,
            value: '**  **',
          },
          { name: '╰───────────────•〔🎲〕•───────────────╯', value: '**  **' },
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  }
};