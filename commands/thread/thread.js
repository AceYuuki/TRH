module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    exemples: ['thread join', 'thread leave'],
    description: 'Commande concernant les threads',
     async run(client, message, args) {
        let thread = message.channel;
        if ((!thread.isThread())) return message.reply(`Impossible d'effectuer cette commande car vous n'êtes pas dans un thread !`);
        if (!args[0] || !args[0].match(/^(join|leave|archive|unarchive|delete)$/)) return message.reply('Merci d\'entrer une sous-commande valide (`join|leave|archive|unarchive|delete`)');

        if (args[0] === 'join') {
            message.reply({content:'le bot a rejoin le thread !'});
            if (thread.joinable) await thread.join();
        } else if (args[0] === 'leave') {
            message.reply({content:'le bot a quitté le thread !'});
            await thread.leave();
        } else if (args[0] === 'archive') {
            await message.reply({content:'Le thread est archivé'});
            await  thread.setArchived(true);
        } else if (args[0] === 'unarchive') {
            message.reply({content:'Le thread n\'est plus archivé'});
            await  thread.setArchived(false);
        } else if (args[0] === 'delete') {
            const channelId = args[1];
            if (!args[1]) return message.reply('Indique un channel de logs via son ID !')
            const logChannel = client.channels.cache.get(channelId);
            await logChannel.send({content: `Le bot a supprimé le thread: ${thread.name}`});
            await thread.delete();
        }
    },
    options: [
        {
            name: 'join',
            description: 'joindre un thread',
            type: 'SUB_COMMAND'
        },
        {
            name: 'leave',
            description: 'quitter un thread',
            type: 'SUB_COMMAND',
        },
        {
            name: 'archive',
            description: 'vérouiller un thread',
            type: 'SUB_COMMAND'
        },
        {
            name: 'unarchive',
            description: 'vérouiller un thread',
            type: 'SUB_COMMAND'
        },
        {
            name: 'delete',
            description: 'supprime un thread',
            type: 'SUB_COMMAND',
            options: [ {name: 'channel', type: 'STRING', description: 'id du channel', required: true} ]
        },
    ],
    async runInteraction(client, interaction){
        let thread = interaction.channel;
        if ((!thread.isThread())) return interaction.reply(`Impossible d'effectuer cette commande car vous n'êtes pas dans un thread !`);

        if (interaction.options.getSubcommand() === 'join') {
            interaction.reply({content:'le bot a rejoin le thread !', ephemeral: true});
            if (thread.joinable) await thread.join();
        } else if (interaction.options.getSubcommand() === 'leave') {
            interaction.reply({content:'le bot a quitté le thread !', ephemeral: true});
            await thread.leave();
        } else if (interaction.options.getSubcommand() === 'archive') {
            await interaction.reply({content:'Le thread est archivé', ephemeral: true});
            await  thread.setArchived(true);
        } else if (interaction.options.getSubcommand() === 'unarchive') {
            interaction.reply({content:'Le thread est archivé', ephemeral: true});
            await  thread.setArchived(false);
        } else if (interaction.options.getSubcommand() === 'delete') {
            const channelId = interaction.options.getString('channel')
            const logChannel = client.channels.cache.get(channelId);
            await logChannel.send({content: `Le bot a supprimé le thread: ${thread.name}`});
            await thread.delete();
        }
    }
}