const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'emote',
  category: 'utils',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'emote <:emote:>',
  exemples: ['emote <:emote:>'],
  description: 'Affiche les informations de l\'emote',

  async run(client, message, args) {
    if (!args[0]) {
      return message.reply('Veuillez fournir l\'emote à analyser.');
    }

    const emote = getEmoteFromArgument(args[0]);

    if (!emote) {
      return message.reply('L\'emote fournie est invalide ou n\'appartient pas à ce serveur.');
    }

    const emoteInfoEmbed = new MessageEmbed()
      .setTitle(`Informations sur l'emote "${emote.name}"`)
      .addField('Nom:', emote.name)
      .addField('ID:', emote.id)
      .addField('Date de création:', emote.createdAt.toDateString())
      .setImage(emote.url)
      .setColor('#FFA500');

    message.channel.send({ embeds: [emoteInfoEmbed] });

    function getEmoteFromArgument(emoteArg) {
        const emoteMatch = emoteArg.match(/<a?:\w+:(\d+)>/);
        if (emoteMatch) {
          const emoteId = emoteMatch[1];
          return message.guild.emojis.cache.get(emoteId);
        }
        return null;
      }
  },
};


