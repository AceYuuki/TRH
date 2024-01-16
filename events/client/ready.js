const Logger = require('../../utils/Logger');
const { getTwitchAccessToken, getTwitchUserIds, checkTwitchStreams } = require('../../index.js'); // Import des fonctions

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, guildSettings) {
        let guildCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.ready(` - Connecté pour ${usersCount} utilisateurs sur ${guildCount.size} serveurs discord !`);
        
        //const devGuild = await client.guilds.cache.get(process.env.GUILD_ID);
        //devGuild.commands.set(client.commands.map(cmd => cmd));
        client.application.commands.set(client.commands.map(cmd => cmd));

        const statuses = [
            () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs m'utilisent !`,
            () => `Mentionne moi pour avoir des infos sur moi`
        ]
        let i = 0
        setInterval(() => {
            client.user.setActivity(statuses[i](), {type: 'PLAYING'})
            i = ++i % statuses.length
        }, 1e4)
        client.user.setStatus('dnd');
        getTwitchAccessToken().then(() => {
            getTwitchUserIds().then(() => {
                setInterval(checkTwitchStreams, 60000); // Vérifie toutes les minutes
            });
        });
    }
}