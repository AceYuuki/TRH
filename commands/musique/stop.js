const { joinVoiceChannel } = require('@discordjs/voice');
const MusicQueue = require('../../models/musicQueue');

module.exports = {
    name: 'stop',
    category: 'musique',
    ownerOnly: false,
    exemples: ['/stop'],
    permissions: ['SEND_MESSAGES'],
    usage: 'stop',
    description: 'Arrête la lecture de musique en cours et efface la file d\'attente.',
    async runInteraction(client, interaction, queue) {
        // Vérifier si le bot est dans un canal vocal
        if (!interaction.guild.me.voice.channel) {
            return interaction.reply("Je ne suis pas connecté à un canal vocal.");
        }

        // Arrêter le lecteur audio et nettoyer les ressources
        const connection = joinVoiceChannel({
            channelId: interaction.guild.me.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        connection.destroy();

        // Supprimer la file d'attente de la base de données
        const guildId = interaction.guildId;
        await MusicQueue.deleteOne({ guildId });

        interaction.reply("La musique a été arrêtée et la file d'attente a été effacée.");
    },
};
