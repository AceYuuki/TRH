// musicUtils.js
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core-discord');
const { MessageEmbed } = require('discord.js');
const MusicQueue = require('../models/musicQueue');

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Créer une instance globale du lecteur audio
const audioPlayer = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

async function playMusic(track, memberChannel, interaction) {
    try {
        // Rejoindre le canal vocal de l'utilisateur
        const connection = joinVoiceChannel({
            channelId: memberChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        // Créer un flux audio à partir de la vidéo YouTube
        const resource = createAudioResource(await ytdl(track.url), {
            inputType: 'opus',
        });

        // Lire le flux audio en utilisant le lecteur audio global
        audioPlayer.play(resource);

        // Événement pour vérifier si le lecteur a terminé la lecture
        audioPlayer.on(AudioPlayerStatus.Idle, async () => {
            const guildId = interaction.guildId;
            const musicQueue = await MusicQueue.findOneAndUpdate(
                { guildId },
                { $pop: { queue: -1 } },
                { new: true }
            );

            const updatedQueue = musicQueue.queue;

            if (updatedQueue.length === 0) {
                // Si la file d'attente est vide, détruire la connexion et arrêter le lecteur
                if (!connection.state.status === AudioPlayerStatus.Destroyed) {
                    connection.destroy();
                }
                audioPlayer.stop();
            } else {
                // S'il y a des musiques dans la file d'attente, lire la suivante
                const nextTrack = updatedQueue[0];
                const videoThumbnail = nextTrack.thumbnail;
                const videoAuthor = nextTrack.author;
                const videoDuration = nextTrack.duration;

                // Récupérer les informations sur la personne qui a ajouté la musique et la position dans la queue
                const addedBy = nextTrack.addedBy;
                const position = updatedQueue.length; // Position dans la queue, car on a déjà retiré le premier élément

                // Ajouter les informations dans l'objet pour la musique suivante
                nextTrack.addedBy = addedBy;
                nextTrack.position = position;

                // Créer un message embed avec les informations de la musique suivante
                const embed = new MessageEmbed()
                    .setTitle(`Musique suivante: ${nextTrack.title}`)
                    .setDescription(`
                    **__Ajoutée par :__** **\`${addedBy}\`**
                    **__Durée :__** **\`${formatDuration(videoDuration)}\`**
                    **__Position dans la queue :__** **\`${position}\`**
                    **__Auteur :__** **\`${videoAuthor}\`**
                    `)
                    .setColor('#64cc1a')
                    .setImage(videoThumbnail)
                    .setTimestamp();

                // Envoyer le message embed
                interaction.followUp({ embeds: [embed] });
                playMusic(nextTrack, memberChannel, interaction);
            }
        });

        // Joindre la connexion du canal vocal avec le lecteur audio global
        connection.subscribe(audioPlayer);

        // Pas de réponse ici, la commande "play" gère la réponse pour indiquer que la musique est en cours de lecture
    } catch (error) {
        console.error('Erreur lors de la lecture de la musique:', error);
        // Pas de réponse ici, la commande "play" gère la réponse pour indiquer qu'une erreur s'est produite
    }
}

module.exports = {
    playMusic,
};
