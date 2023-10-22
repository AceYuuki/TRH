const { VoiceConnectionStatus, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');

// Utilitaire pour obtenir ou créer la connexion vocale
async function getVoiceConnection(interaction) {
    const memberChannel = interaction.member.voice.channel;
    if (!memberChannel) {
        await interaction.reply("Vous devez être connecté dans un canal vocal pour utiliser cette commande.");
        return null;
    }

    try {
        const connection = joinVoiceChannel({
            channelId: memberChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        return connection;
    } catch (error) {
        console.error("Erreur lors de la connexion au canal vocal :", error);
        await interaction.reply("Une erreur s'est produite lors de la connexion au canal vocal.");
        return null;
    }
}

module.exports = {
    name: 'resume',
    category: 'musique',
    ownerOnly: false,
    exemples: ['/resume'],
    usage: 'resume',
    permissions: ['SEND_MESSAGES'],
    description: 'Reprend la lecture de la musique en pause.',
    async runInteraction(client, interaction) {
        // Obtenir ou créer la connexion vocale
        const connection = await getVoiceConnection(interaction);
        if (!connection) return;

        // Vérifier si la musique est déjà en lecture
        const audioPlayer = connection.state.subscription?.player;
        if (!audioPlayer || audioPlayer.state.status === AudioPlayerStatus.Playing) {
            return interaction.reply("La musique est déjà en lecture.");
        }

        // Reprendre la lecture de la musique
        audioPlayer.unpause();

        interaction.reply("La musique a été reprise.");
    },
};
