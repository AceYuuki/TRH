const { VoiceConnectionStatus, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'pause',
    category: 'musique',
    ownerOnly: false,
    exemples: ['/pause'],
    usage: 'pause',
    permissions: ['SEND_MESSAGES'],
    description: 'Met en pause la lecture de la musique.',
    async runInteraction(client, interaction) {
        // Vérifier si l'auteur de l'interaction est connecté à un canal vocal
        const memberChannel = interaction.member.voice.channel;
        if (!memberChannel) {
            return interaction.reply("Vous devez être connecté dans un canal vocal pour utiliser cette commande.");
        }

        // Vérifier si le bot est en train de jouer de la musique dans le même canal vocal
        const connection = getVoiceConnection(interaction.guildId);
        if (!connection || connection.state.status === VoiceConnectionStatus.Destroyed) {
            return interaction.reply("Le bot ne joue pas de musique dans ce canal vocal.");
        }

        // Vérifier si la musique est déjà en pause
        const audioPlayer = connection.state.subscription?.player;
        if (!audioPlayer || audioPlayer.state.status === AudioPlayerStatus.Paused) {
            return interaction.reply("La musique est déjà en pause.");
        } else {
            // Mettre en pause la lecture de la musique
            audioPlayer.pause();

            interaction.reply("La musique a été mise en pause.");
        }
    },
};
