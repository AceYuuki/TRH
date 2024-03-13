const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.on('modalSubmit', async (modal) => {
        if (modal.customId === 'modal-customid') {
            const nameResponse = modal.getTextInputValue('name');
            const pseudoResponse = modal.getTextInputValue('pseudo');
            const aboutResponse = modal.getTextInputValue('about');
            const motivationResponse = modal.getTextInputValue('motivation');
            const objectifResponse = modal.getTextInputValue('objectif');
        const channeSend = client.channels.cache.get('1216680895101141042');
        modal.reply({content: 'interaction réussi', ephemeral: true});
       
        }
    });
};