const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'english-forms',
    async runInteraction(client, interaction) {
        const modal = new Modal()
            .setCustomId('modal-customid')
            .setTitle('Recruitment Forms');

        const pseudoInput = new TextInputComponent()
            .setCustomId('pseudo')
            .setLabel('Pseudo Discord:')
            .setStyle('SHORT')
            .setPlaceholder('Write your Discord pseudo.')
            .setRequired(true);
        const nameInput = new TextInputComponent()
            .setCustomId('name')
            .setLabel('Name')
            .setStyle('SHORT')
            .setPlaceholder('Write your name here.')
            .setRequired(true);
        const aboutInput = new TextInputComponent()
            .setCustomId('about')
            .setLabel('About You')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Speak About You !')
            .setRequired(true);
        const motivationInput = new TextInputComponent()
            .setCustomId('motivation')
            .setLabel('Motivation')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Tell me your motivations...')
            .setRequired(true);
        const objectifInput = new TextInputComponent()
            .setCustomId('objectif')
            .setLabel('Your Objectif:')
            .setStyle('PARAGRAPH')
            .setPlaceholder('What is your goal as a staff ?')
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
