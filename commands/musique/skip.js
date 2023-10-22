const { joinVoiceChannel } = require('@discordjs/voice');
const { queue, playMusic } = require('../../utils/musicUtils');
const MusicQueue = require('../../models/musicQueue');

module.exports = {
    name: 'skip',
    category: 'musique',
    ownerOnly: false,
    exemples: ['/skip'],
    permissions: ['SEND_MESSAGES'],
    usage: 'skip',
    description: "Passe à la musique suivante dans la file d'attente.",
    async runInteraction(client, interaction) {
        const guildId = interaction.guildId;
        const musicQueue = await MusicQueue.findOne({ guildId });

        if (!musicQueue || musicQueue.queue.length === 0) {
            return interaction.reply("La file d'attente est vide. Je ne peux pas passer à la musique suivante.");
        }

        // Vérifier si le bot est dans un canal vocal
        if (!interaction.guild.me.voice.channel) {
            return interaction.reply("Je ne suis pas connecté à un canal vocal.");
        }

        // Retirer la musique en cours de lecture de la file d'attente
        musicQueue.queue.shift();

        // Vérifier s'il y a d'autres musiques dans la file d'attente
        if (musicQueue.queue.length === 0) {
            // Arrêter le lecteur audio et nettoyer les ressources s'il n'y a plus de musiques dans la file d'attente
            const connection = joinVoiceChannel({
                channelId: interaction.guild.me.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            connection.destroy();

            await musicQueue.deleteOne(); // Supprimer la file d'attente vide de la base de données

            return interaction.reply("La musique en cours a été sautée et la file d'attente est vide.");
        }

        // Sauvegarder les modifications apportées à la file d'attente dans la base de données
        await musicQueue.save();

        // Jouer la prochaine musique dans la file d'attente
        const nextTrack = musicQueue.queue[0];
        playMusic(nextTrack, interaction.member.voice.channel, interaction);

        // Répondre à l'interaction pour indiquer que la musique a été sautée
        interaction.reply(`Musique suivante: ${nextTrack.title}`);
    },
};
