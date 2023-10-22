const { MessageEmbed } = require('discord.js');
const MusicQueue = require('../../models/musicQueue');

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

module.exports = {
    name: 'queue',
    category: 'musique',
    ownerOnly: false,
    permissions: ['SEND_MESSAGES'],
    usage: 'queue',
    exemples: ['/queue'],
    description: 'Affiche la file d\'attente des musiques.',
    async runInteraction(client, interaction) {
        try {
            // Récupérer la file d'attente spécifique à ce serveur depuis la base de données
            const guildId = interaction.guildId;
            const musicQueue = await MusicQueue.findOne({ guildId }).exec();

            if (!musicQueue || musicQueue.queue.length === 0) {
                return interaction.reply("La file d'attente est vide.");
            }

            const currentTrack = musicQueue.queue[0]; // Récupérer la musique en cours de lecture

            // Afficher la liste des musiques en file d'attente
            const embed = new MessageEmbed()
                .setColor('#cc6d1a')
                .setTitle('File d\'attente');

            if (currentTrack) {
                // Vérifier si la musique en cours a la propriété 'title' définie
                if (currentTrack.title) {
                    embed.setDescription(`*__Musique en cours de lecture :__* **\`${currentTrack.title}\`**\n\n*Musiques en file d'attente pour ce serveur :*`);
                } else {
                    embed.setDescription(`**Musique en cours de lecture :** \n\n**Musiques en file d'attente pour ce serveur :**`);
                }
            } else {
                embed.setDescription(`**Musiques en file d'attente pour ce serveur :**`);
            }

            musicQueue.queue.forEach((item, index) => {
                const duration = formatDuration(item.duration);
                const author = item.author || 'Auteur inconnu';
            
                if (index === 0) {
                    embed.addField(
                        `${index + 1}. ${item.title}`,
                        `**Auteur :** **\`${author}\`**\n**Durée :** **\`${duration}\`**\n **Status :** **\`(Actuellement en cours de lecture ...)\`**  `
                    );
                } else {
                    embed.addField(
                        `${index + 1}. ${item.title}`,
                        `**Auteur :** **\`${author}\`**\n**Durée :** **\`${duration}\`**\n **Status :** **\`En attente\`**`
                    );
                }
            });

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération de la file d\'attente:', error);
            interaction.reply("Une erreur s'est produite lors de la récupération de la file d'attente.");
        }
    },
};
