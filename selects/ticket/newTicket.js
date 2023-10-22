const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: 'newTicket',
  async runInteraction(client, interaction, guildSettings) {
    const fetchGuild = await client.getGuild(interaction.guild);
    const reason = interaction.values[0];
    const embed = new MessageEmbed();

    embed.setColor('GREEN');
    embed.setTitle(`Votre ticket a été créé avec succès ${interaction.member.user.username}`);
    embed.setDescription(`*Pour fermer le ticket en cours, cliquez sur le bouton ci-dessous. Attention, il est impossible de revenir en arrière !*\n\n${reason ? `Raison : ${reason}` : ''}`);

    const nameTicket = interaction.member.user.tag;
    const channelName = `ticket-${nameTicket}`;
    const channel = interaction.guild.channels.cache.find((x) => x.name === channelName);

    if (!channel) {
      interaction.guild.channels.create(channelName, {
        type: 'text',
        parent: fetchGuild.serverParent,
        topic: `Ticket créé par ${interaction.member.user.username}${reason ? ` (${reason})` : ''} le ${new Date().toLocaleString()}`,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL],
          },
          {
            id: interaction.member.user.id,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
          },
          {
            id: fetchGuild.roleSupport,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
          },
        ],
      })
        .then((createdChannel) => {
          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId('closeTicket')
              .setLabel('Fermer le Ticket')
              .setStyle('DANGER')
          );

          createdChannel.send({ content: `<@${interaction.member.user.id}>`, embeds: [embed], components: [row] });

          const LogsEmbed = new MessageEmbed();

          LogsEmbed.setColor('GREEN');
          LogsEmbed.setThumbnail(interaction.member.user.displayAvatarURL({ format: 'png', dynamic: true }));
          LogsEmbed.setTitle(`**__Information sur le ticket de ${createdChannel.name}__**`);
          LogsEmbed.setDescription(`**Informations :**\n**Ticket** : ${createdChannel.name}\n**Action** : Ouverture`);

          const logsTickets = client.channels.cache.find((channel) => channel.id === fetchGuild.ticketLog);
          logsTickets.send({ embeds: [LogsEmbed] });
        })
        .catch((error) => {
          console.error('Erreur lors de la création du ticket :', error);
        });
    } else {
      interaction.update({ content: `Vous avez déjà un ticket ouvert <#${channel.id}> ❌`, components: [], ephemeral: true });
    }
  },
};
