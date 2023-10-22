const { MessageEmbed } = require('discord.js');
const Role = require('../../models/rolesSchema');

module.exports = { 
    name: 'deldbrole',
    category: 'configuration',
    permissions: ['MANAGE_ROLES'],
    ownerOnly: false,
    usage: 'deldbrole [roleID]',
    exemples: 'deldbrole [1234567891236456789]',
    description: 'Supprimes un rôle enregistré dans la base de données.',
    options: [
        {
            name: 'role_id',
            description: "L'ID du rôle",
            type: 'STRING',
            required: true,
          },
    ],
    async runInteraction(client, interaction) {
        // Vérifie si l'utilisateur a la permission de gérer les rôles
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
          return interaction.reply("Vous n'avez pas la permission de gérer les rôles.");
        }
        const roleId = interaction.options.getString('role_id');
    
        try {
            const role = await Role.findOne({guildId: interaction.guild.id, roleId: roleId});

            if (!role) {
                return interaction.reply({ content: "Ce rôle n'existe pas ou n'est pas disponible.", ephemeral: true });
            }

            await role.remove();

            const embed = new MessageEmbed()
            .setDescription(`Le rôle (<@&${role.roleId}>) avec l'ID (${role.roleId}) a été supprimé de la base de données.`)
            .setColor('RANDOM')
            return interaction.reply({ embeds: [embed]});
        } catch (error) {
            console.error('Erreur lors de la suppression du rôle :', error);
            return interaction.reply({ content: "Une erreur s'est produite lors de la suppression du rôle. Veuillez réessayer ultérieurement.", ephemeral: true });
          }
      },
}