const { MessageEmbed } = require('discord.js');
const Role = require('../../models/rolesSchema');

module.exports = {
  name: 'dbaddrole',
  category: 'configuration',
  permissions: ['MANAGE_ROLES'],
  ownerOnly: false,
  usage: 'dbaddrole --emoji <emoji> --nom_du_rôle <nom_du_rôle> --role_id <id_du_rôle> --catégorie <catégorie>',
  exemples: ['dbaddrole --emoji 🍎 --nom_du_rôle "Rôle 1" --role_id 123456789012345678 --catégorie "Mention"'],
  description: 'Enregistre un rôle et sa description dans la base de données',
  options: [
    {
      name: 'nom_du_rôle',
      description: 'Le nom du rôle',
      type: 'STRING',
      required: true,
    },
    {
      name: 'role_id',
      description: "L'ID du rôle",
      type: 'STRING',
      required: true,
    },
    {
      name: 'catégorie', // Nouvelle option pour la catégorie du rôle
      description: 'La catégorie du rôle',
      type: 'STRING',
      required: true,
    },
  ],
  async runInteraction(client, interaction) {
    // Vérifie si l'utilisateur a la permission de gérer les rôles
    if (!interaction.member.permissions.has('MANAGE_ROLES')) {
      return interaction.reply("Vous n'avez pas la permission de gérer les rôles.");
    }

    const roleName = interaction.options.getString('nom_du_rôle');
    const roleId = interaction.options.getString('role_id');
    const category = interaction.options.getString('catégorie'); // Récupérer la valeur pour la catégorie du rôle

    try {
      // Créer un nouvel objet Role à partir du schéma avec la catégorie
      const newRole = new Role({
        guildId: interaction.guild.id,
        roleName: roleName,
        roleId: roleId,
        category: category, // Ajouter la catégorie à l'objet Role
      });

      // Enregistrement du rôle dans la base de données
      await newRole.save();

      const embed = new MessageEmbed()
        .setDescription(`Le rôle (<@&${roleId}>) a été enregistré dans la catégorie "${category}"`)
        .setColor('RANDOM');

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du rôle dans la base de données :', error);
      return interaction.reply("Une erreur s'est produite lors de l'enregistrement du rôle. Veuillez réessayer ultérieurement.");
    }
  },
};
