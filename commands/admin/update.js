const { Guild } = require('../../models/index');

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    exemples: ['update'],
    description: 'met à jour la base de données',
    async run(client, message, args) {
        await Guild.updateMany({}, {"$set": {"testChannel": "1098201080011178015"}, upsert: true});
        message.reply('La base de données a été mise à jour ! <a:Discord_Loading:1100357783792132148>');
    },
    
    async runInteraction(client, interaction){
        await Guild.updateMany({}, {"$set": {"testChannel": "1098201080011178015"}, upsert: true});
        interaction.reply('La base de données a été mise à jour !<a:Discord_Loading:1100357783792132148>');
    }
}