module.exports = {
    name: 'calcule',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'calcule',
    exemples: ['calcule'],
    description: 'te permet de calculer',
    async run(client, message, args) {
       const simplydjs = require('simply-djs');
       simplydjs.calculator(message)
    },
    runInteraction(client, interaction, guildSettings){
        const prefix = guildSettings.prefix;
        interaction.reply({content: `vueillez faire ${prefix}calcule`})
    }
}