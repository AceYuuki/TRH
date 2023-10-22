const { MessageEmbed } = require('discord.js');
const ytsearch = require('yt-search');
const { playMusic } = require('../../utils/musicUtils');
const MusicQueue = require('../../models/musicQueue');

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

module.exports = {
    name: 'play',
    category: 'musique',
    ownerOnly: false,
    exemples: ['/play See you again'],
    permissions: ['SEND_MESSAGES'],
    usage: 'play [query]',
    description: 'Joue de la musique à partir de YouTube.',
    options: [
        {
            name: 'query',
            description: 'Titre de la chanson',
            type: 'STRING',
            required: true,
        },
    ],

    async runInteraction(client, interaction) {
        // Récupérer l'argument "query" de l'interaction
        const query = interaction.options.getString('query');

        // Vérifier si l'utilisateur est dans un canal vocal
        const memberChannel = interaction.member.voice.channel;
        if (!memberChannel) {
            return interaction.reply("Vous devez être dans un canal vocal pour utiliser cette commande.");
        }

        try {
            // Effectuer la recherche sur YouTube avec yt-search
            const searchResult = await ytsearch(query);

            if (!searchResult || searchResult.videos.length === 0) {
                return interaction.reply("Aucun résultat trouvé pour cette recherche.");
            }

            const videoUrl = searchResult.videos[0].url;
            const videoTitle = searchResult.videos[0].title;
            const videoThumbnail = searchResult.videos[0].thumbnail;
            const videoAuthor = searchResult.videos[0].author.name;
            const videoDuration = searchResult.videos[0].duration.seconds;

            // Récupérer le nom de la personne qui a ajouté la musique
            const addedBy = interaction.user.tag;

            // Trouver ou créer la file d'attente pour ce serveur
            const guildId = interaction.guildId;
            const musicQueue = await MusicQueue.findOneAndUpdate(
                { guildId },
                {},
                { upsert: true, new: true }
            );

            // Ajouter la vidéo à la file d'attente
            const position = musicQueue.queue.length + 1;
            musicQueue.queue.push({
                title: videoTitle,
                url: videoUrl,
                author: videoAuthor,
                duration: videoDuration,
                thumbnail: videoThumbnail,
                addedBy: addedBy,
                position: position,
            });
            const queuePosition = musicQueue.queue.length;

            // Vérifier si c'est la première musique de la queue
            if (musicQueue.queue.length === 1) {
                // Envoyer un message de lecture
                const embed = new MessageEmbed()
                    .setColor('#64cc1a')
                    .setTitle(`${videoTitle}`)
                    .setDescription(`
                    **__Ajoutée par:__** \n**\`${addedBy}\`**
                    **__Durée:__** \n**\`${formatDuration(videoDuration)}\`**
                    **__Position dans la queue:__** \n**\`${queuePosition}\`**
                    **__Auteur de la vidéo:__** \n**\`${videoAuthor}\`**
                    `)
                    .setURL(videoUrl)
                    .setImage(videoThumbnail)
                    .setFooter('Musique en cours de lecture ...')
                    .setTimestamp();

                interaction.reply({ embeds: [embed] });
                // Définir isFirstQueueMusic sur false pour les prochaines fois
                musicQueue.isFirstQueueMusic = false;
                await musicQueue.save();
            } else {
                // Répondre à l'interaction pour indiquer que la musique a été ajoutée à la file d'attente
                const embed = new MessageEmbed()
                    .setColor('#cc6d1a')
                    .setTitle(`${videoTitle}`)
                    .setDescription(`
                    **__Ajoutée par:__** \n**\`${addedBy}\`**
                    **__Durée:__** \n**\`${formatDuration(videoDuration)}\`**
                    **__Position dans la queue:__** \n**\`${queuePosition}\`**
                    **__Auteur de la vidéo:__** \n**\`${videoAuthor}\`**
                    `)
                    .setURL(videoUrl)
                    .setThumbnail(videoThumbnail)
                    .setFooter('Musique ajoutée à la file d\'attente ...')
                    .setTimestamp();

                interaction.reply({ embeds: [embed] });
                await musicQueue.save();
            }

            // S'il y a une musique en cours de lecture, lancer la lecture
            if (musicQueue.queue.length === 1) {
                playMusic(musicQueue.queue[0], memberChannel, interaction);
            }

        } catch (error) {
            console.error('Erreur lors de la recherche et de la lecture de la musique:', error);
            interaction.reply("Une erreur s'est produite lors de la recherche ou de la lecture de la musique.");
        }
    },
};
