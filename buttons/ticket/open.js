const { MessageSelectMenu, MessageActionRow } = require('discord.js')

module.exports = {
    name: 'ticket-button',
    async runInteraction(client, interaction) {
        const selectMenu = new MessageSelectMenu();

            selectMenu.setCustomId('newTicket');
            selectMenu.setPlaceholder('Choisissez une raison pour le ticket');
            selectMenu.addOptions([
                {
                    emoji: '🚫',
                    label: 'Moderation',
                    description: 'Signaler un problème',
                    value: 'newTicket_Moderation'
                },
                {
                    emoji: '🏮',
                    label: 'Recrutement',
                    description: 'Se faire recruter dans l\'équipe',
                    value: 'newTicket_Recrutement'
                },
                {
                    emoji: '📝',
                    label: 'Informations',
                    description: 'Demander une quelconque information',
                    value: 'newTicket_Informations'
                },
            ]);

            const row = new MessageActionRow().addComponents(selectMenu);

            return interaction.reply({ content: 'Quelle sera la raison du ticket ?', components: [row], ephemeral: true });
            
    }
}