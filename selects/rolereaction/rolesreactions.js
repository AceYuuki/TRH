const Role = require('../../models/rolesSchema');

module.exports = {
  name: 'roles_reaction_select',
  async runInteraction(client, interaction, guildSettings) {
    // Récupérer la valeur (ID du rôle) sélectionnée dans le select menu
    const selectedRoleId = interaction.values[0];

    // Rechercher le rôle correspondant dans la base de données
    try {
      const role = await Role.findOne({ guildId: interaction.guild.id, roleId: selectedRoleId });

      // Vérifier si le rôle existe
      if (!role) {
        return interaction.reply({ content: "Ce rôle n'existe pas ou n'est pas disponible.", ephemeral: true });
      }

      // Vérifier si l'utilisateur a déjà le rôle
      const member = interaction.member;
      if (member.roles.cache.has(role.roleId)) {
        return interaction.reply({ content: "Vous avez déjà ce rôle.", ephemeral: true });
      }

      // Ajouter le rôle à l'utilisateur
      await member.roles.add(role.roleId);

      // Répondre à l'utilisateur
      await interaction.reply({ content: `Le rôle <@&${role.roleId}> vous a été attribué.`, ephemeral: true });
    } catch (error) {
      console.error('Erreur lors de l\'attribution du rôle :', error);
      return interaction.reply({ content: "Une erreur s'est produite lors de l'attribution du rôle. Veuillez réessayer ultérieurement.", ephemeral: true });
    }
  },
};
