const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const Role = require('../../models/rolesSchema');

module.exports = {
  name: 'rolesreaction',
  category: 'modération',
  permissions: ['MANAGE_ROLES'],
  ownerOnly: false,
  usage: 'rolesreaction',
  exemples: ['rolesreaction'],
  description: 'Affiche un message pour ajouter des rôles via réactions',
  options: [
    {
      name: 'channel',
      description: 'Le canal à déplacer.',
      type: 'CHANNEL',
      required: true,
    },
    {
      name: 'color',
      description: "La couleur de l'embed",
      type: 'STRING',
      required: false,
    },
    {
      name: 'image',
      description: "La image de l'embed (en lien)",
      type: 'STRING',
      required: false,
    },
  ],
  async runInteraction(client, interaction) {
    // Vérifie si l'utilisateur a la permission de gérer les rôles
    if (!interaction.member.permissions.has('MANAGE_ROLES')) {
      return interaction.reply("Vous n'avez pas la permission de gérer les rôles.");
    }
    const chooseColor = interaction.options.getString('color');
    const chooseImage = interaction.options.getString('image');
    const channel = interaction.options.getChannel('channel');

    try {
      // Récupérer les rôles à partir de la base de données
      const roles = await Role.find({ guildId: interaction.guild.id });

      // Si aucune rôle n'est enregistré, envoyer un message pour enregistrer des rôles
      if (roles.length === 0) {
        return interaction.reply("Il n'y a aucun rôle enregistré. Veuillez enregistrer des rôles en utilisant la commande appropriée.");
      }

      // Créer un objet pour stocker les rôles triés par catégorie
      const rolesByCategory = {};

      // Regrouper les rôles par catégorie dans l'objet rolesByCategory
      roles.forEach(role => {
        if (!rolesByCategory[role.category]) {
          rolesByCategory[role.category] = [];
        }
        rolesByCategory[role.category].push(role);
      });

      // Créer l'embed pour les rôles réactions
      const embed = new MessageEmbed()
        .setTitle('Rôles Réactions')
        .setDescription('Cliquez sur les boutons ci-dessous pour obtenir les rôles correspondants.')
        .setColor(chooseColor)
        .setImage(chooseImage);

      // Ajouter les rôles triés par catégorie dans l'embed
      for (const category in rolesByCategory) {
        const categoryRoles = rolesByCategory[category];
        const categoryFieldContent = categoryRoles.map(role => `<@&${role.roleId}>`).join('\n');
        embed.addField(`> • | __${category}__ :`, categoryFieldContent);
      }

      // Créer le select menu pour les rôles réactions
      const selectMenu = new MessageSelectMenu()
        .setCustomId('roles_reaction_select')
        .setPlaceholder('Choisissez un rôle');

      roles.forEach(role => {
        selectMenu.addOptions([
          {
            label: role.roleName,
            description: role.description,
            value: role.roleId,
          },
        ]);
      });

      // Créer l'action row pour le select menu
      const actionRow = new MessageActionRow()
        .addComponents(selectMenu);

      // Envoyer le message avec l'embed et le select menu
      channel.send({ embeds: [embed], components: [actionRow] });
      interaction.reply({ content: `Le panel de rôles réactions est envoyé dans le canal : ${channel}.`, ephemeral: true });
    } catch (error) {
      console.error('Erreur lors de la récupération des rôles depuis la base de données :', error);
      return interaction.reply({ content: "Une erreur s'est produite lors de l'affichage des rôles réactions. Veuillez réessayer ultérieurement.", ephemeral: true });
    }
  },
};
