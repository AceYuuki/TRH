const { Permissions } = require('discord.js');

module.exports = {
    name: 'clearall',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clearall',
    exemples: ['clearall'],
    description: 'Efface tous les messages du salon',

    async run(client, message, args) {
        // Vérifie si l'utilisateur a la permission de gérer les messages
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.channel.send("Vous n'avez pas la permission de gérer les messages.");
        }

        const channel = message.channel;
        const channelName = channel.name;
        const channelPermissions = channel.permissionOverwrites.cache.map(overwrite => ({
            id: overwrite.id,
            allow: overwrite.allow.toArray(),
            deny: overwrite.deny.toArray(),
            type: overwrite.type
        }));
        const channelPosition = channel.position;
        const channelParent = channel.parent;
        const fetchGuild = await client.getGuild(message.guild);
        const logText = client.channels.cache.get(fetchGuild.modLog);

        logText.send(`Suppression de messages sur le channel ${message.channel}\n`)

        const transcript = await createTranscript(message.channel, {
             limit: -1,
            fileName: `message_logs.html`,
            returnBuffer: false,
        })
        logText.send({files: [transcript] });

        // Supprime le canal existant
        await channel.delete();
        console.log(`Le canal '${channelName}' a été supprimé`);

        // Crée un nouveau canal avec les mêmes permissions, la même position et dans la même catégorie que le canal précédent
        const guild = message.guild;
        const newChannel = await guild.channels.create(channelName, {
            type: 'GUILD_TEXT',
            permissionOverwrites: channelPermissions,
            position: channelPosition,
            parent: channelParent
        });
        console.log(`Le canal '${channelName}' a été recréé avec succès dans la même catégorie et à la même position`);
    },

    async runInteraction(client, interaction) {
        // Vérifie si l'utilisateur a la permission de gérer les messages
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ content: "Vous n'avez pas la permission de gérer les messages.", ephemeral: true });
        }

        const channel = interaction.channel;
        const channelName = channel.name;
        const channelPermissions = channel.permissionOverwrites.cache.map(overwrite => ({
            id: overwrite.id,
            allow: overwrite.allow.toArray(),
            deny: overwrite.deny.toArray(),
            type: overwrite.type
        }));
        const channelPosition = channel.position;
        const channelParent = channel.parent;
        const fetchGuild = await client.getGuild(interaction.guild);
        const logText = client.channels.cache.get(fetchGuild.modLog);

        const transcript = await createTranscript(interaction.channel, {
            limit: -1,
            fileName: `message_logs.html`,
            returnBuffer: false,
        })
        logText.send({files: [transcript] });

        // Supprime le canal existant
        await channel.delete();
        console.log(`Le canal '${channelName}' a été supprimé`);

        // Crée un nouveau canal avec les mêmes permissions, la même position et dans la même catégorie que le canal précédent
        const guild = interaction.guild;
        const newChannel = await guild.channels.create(channelName, {
            type: 'GUILD_TEXT',
            permissionOverwrites: channelPermissions,
            position: channelPosition,
            parent: channelParent
        });
        console.log(`Le canal '${channelName}' a été recréé avec succès dans la même catégorie et à la même position`);

        interaction.reply({ content: `Le canal '${channelName}' a été supprimé puis recréé avec succès dans la même catégorie et à la même position.`, ephemeral: true });
    }
};