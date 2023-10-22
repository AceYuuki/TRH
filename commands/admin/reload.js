module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    exemples: ['reload'],
    description: 'Relance le bot',
    async run(client, message, args) {
        //const devGuild = await client.guilds.cache.get('958499857503514635');
        //devGuild.commands.set([]);
        await message.reply('Bot relancé !');
        process.exit().connected()
        
    },
    
    async runInteraction(client, interaction){
        //const devGuild = await client.guilds.cache.get('958499857503514635');
        //devGuild.commands.set([]);
        await interaction.reply('Bot relancé !');
        return process.exit();
    }
}