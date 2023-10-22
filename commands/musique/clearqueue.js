const { joinVoiceChannel } = require('@discordjs/voice');
const MusicQueue = require('../../models/musicQueue');

module.exports = {
    name: 'clearqueue',
    category: 'musique',
    ownerOnly: false,
    permissions: ['SEND_MESSAGES'],
    usage: 'clearqueue',
    exemples: ['/clearqueue'],
    description: 'Supprime entièrement la liste d\'attente des musiques à jouer',
    async runInteraction(client, interaction, queue) {
        // Vérifier si le bot est dans un canal vocal
        if (!interaction.guild.me.voice.channel) {
            return interaction.reply("Je ne suis pas connecté à un canal vocal.");
        }

        // Vérifier si l'auteur de l'interaction est dans un canal vocal
        const memberChannel = interaction.member.voice.channel;
        if (!memberChannel) {
            return interaction.reply("Vous devez être dans un canal vocal pour utiliser cette commande.");
        }

        // Supprimer la file d'attente de la base de données
        const guildId = interaction.guildId;
        await MusicQueue.deleteOne({ guildId });

        interaction.reply("Vous venez de supprimer entièrement la liste d'attente des musiques à jouer.");
    },
};
