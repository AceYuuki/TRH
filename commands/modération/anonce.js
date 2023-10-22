const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'annonce',
  category: 'modération',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'annonce',
  exemples: ['annonce'],
  description: 'Crée une annonce personnalisée en utilisant un embed',
  options: [
    {
      name: 'title',
      description: 'Le titre de l\'annonce',
      type: 'STRING',
      required: true,
    },
    {
      name: 'description',
      description: 'La description de l\'annonce',
      type: 'STRING',
      required: true,
    },
    {
        name: 'channel',
        description: 'choisi le channel où l\'annonce sera envoyé',
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
        name: 'image',
        description: 'L\'URL de l\'image à inclure dans l\'embed (ou "default" pour ne pas en inclure)',
        type: 'STRING',
        required: false,
    }
  ],

  async runInteraction(client, interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    let color = interaction.options.getString('color')?.toLowerCase() || '#FFA500';
    let image = interaction.options.getString('image')?.toLowerCase() || '';
    const channel = interaction.options.getChannel('channel')
    if (color !== 'default' && !/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.test(color)) {
      color = '#FFA500';
    }

    // Créer l'embed avec les détails fournis
    const annonceEmbed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setImage(image === 'default' ? '' : image)

    // Envoyer l'annonce
    channel.send({ embeds: [annonceEmbed] });

    return interaction.reply('L\'annonce a été envoyé !');
  }
};
