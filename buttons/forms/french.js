const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'french-forms',
    async runInteraction(client, interaction) {
        const modal = new Modal()
            .setCustomId('modal-customid')
            .setTitle('Formulaire de Recrutement');

        const pseudoInput = new TextInputComponent()
            .setCustomId('pseudo')
            .setLabel('Pseudo Discord:')
            .setStyle('SHORT')
            .setPlaceholder('Écrivez votre pseudo Discord.')
            .setRequired(true);
        const nameInput = new TextInputComponent()
            .setCustomId('name')
            .setLabel('Prénom')
            .setStyle('SHORT')
            .setPlaceholder('Écrivez votre prénom.')
            .setRequired(true);
        const aboutInput = new TextInputComponent()
            .setCustomId('about')
            .setLabel('À propos de vous:')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Parlez de vous.')
            .setRequired(true);
        const motivationInput = new TextInputComponent()
            .setCustomId('motivation')
            .setLabel('Motivation:')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Dites-nous vos motivations...')
            .setRequired(true);
        const objectifInput = new TextInputComponent()
            .setCustomId('objectif')
            .setLabel('Vos Objectifs:')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Quel est votre objectif en tant que staff ?')
            .setRequired(true);


            const firstActionRow = new MessageActionRow().addComponents(pseudoInput);
            const secondActionRow = new MessageActionRow().addComponents(nameInput);
            
            // Champs PARAGRAPH dans leurs propres lignes
            const aboutRow = new MessageActionRow().addComponents(aboutInput); // PARAGRAPH seul
            const motivationRow = new MessageActionRow().addComponents(motivationInput); // PARAGRAPH seul
            const objectifRow = new MessageActionRow().addComponents(objectifInput); // PARAGRAPH seul
            
            // Ajouter les MessageActionRows regroupées au modal
            modal.addComponents(firstActionRow, secondActionRow, aboutRow, motivationRow, objectifRow);
            
            await interaction.showModal(modal);
            






    }
};
