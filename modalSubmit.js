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
        modal.reply({content: 'interaction réussi', ephemeral: true})
        const embed = new MessageEmbed()
        .setTitle('Recrutement Staff')
        .setDescritpion(`
        Name | Prénom: ${nameResponse} 
        Pseudo: ${pseudoResponse}
        About you | À propos de vous: ${aboutResponse}
        Motivations: ${motivationResponse}
        Objective | Objectif: ${objectifResponse}

        FR: Cette personne a donc postulé pour être staff.
        EN: So this person applied to be staff.
        
        `)
            channeSend.send({embeds: [embed]});
        }
    });
};