module.exports = {
    name: 'movechannel',
    category: 'modération',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'movechannel',
    exemples: ['movechannel'],
    description: 'Déplace un canal vers une autre catégorie.',
  
    options: [
      {
        name: 'channel',
        description: 'Le canal à déplacer.',
        type: 'CHANNEL',
        required: true,
      },
      {
        name: 'category',
        description: 'La nouvelle catégorie.',
        type: 'CHANNEL',
        required: true,
      },
    ],
  
    async run(client, message, args) {
      // Vérifie si l'auteur de la commande est un administrateur
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply('Vous avoir la permission de modifier les canaux pour utiliser cette commande.');
      }
  
      const channelId = args.channel.id;
      const targetCategoryId = args.category.id;
  
      try {
        const channel = await message.guild.channels.fetch(channelId);
        const targetCategory = await message.guild.channels.fetch(targetCategoryId);
  
        if (!channel || !targetCategory) {
          return message.reply('Impossible de trouver le canal ou la catégorie.');
        }
  
        // Déplace le canal dans la nouvelle catégorie
        await channel.setParent(targetCategory);
  
        message.reply('Le canal a été déplacé avec succès.');
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
        message.reply('Une erreur s\'est produite lors du déplacement du canal.');
      }
    },
  
    async runInteraction(client, interaction) {
      // Vérifie si l'utilisateur de l'interaction est un administrateur
      if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
        return interaction.reply({ content: 'Vous devez être administrateur pour utiliser cette commande.', ephemeral: true });
      }
  
      const channelId = interaction.options.getChannel('channel').id;
      const targetCategoryId = interaction.options.getChannel('category').id;
  
      try {
        const channel = await interaction.guild.channels.fetch(channelId);
        const targetCategory = await interaction.guild.channels.fetch(targetCategoryId);
  
        if (!channel || !targetCategory) {
          return interaction.reply({ content: 'Impossible de trouver le canal ou la catégorie.', ephemeral: true });
        }
  
        // Déplace le canal dans la nouvelle catégorie
        await channel.setParent(targetCategory);
  
        interaction.reply({ content: 'Le canal a été déplacé avec succès.', ephemeral: true });
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
        interaction.reply({ content: 'Une erreur s\'est produite lors du déplacement du canal.', ephemeral: true });
      }
    }
  };
  