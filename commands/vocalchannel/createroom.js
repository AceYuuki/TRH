const Discord = require('discord.js');
const cooldowns = new Set();

module.exports = {
    name: 'createroom',
    category: 'vocalchannel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'createroom [ID de la catégorie]',
    exemples: ['createroom [Team Yuuki]'],
    description: 'te permet de créer un canal vocal temporaire',
    async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);

        try {
            const category = await message.guild.channels.fetch(fetchGuild.vocParent);

            if (category.type !== 'GUILD_CATEGORY') {
                return message.reply('L\'ID fourni ne correspond pas à une catégorie.');
            }

            const user = message.author;

            const newChannel = await message.guild.channels.create(`Channel de ${user.username}`, {
                type: 'GUILD_VOICE',
                parent: fetchGuild.vocParent,
            });

            message.reply(`Canal temporaire créé : ${newChannel}`);

            // Planifier la suppression du canal après 20 secondes s'il est vide
            const timeout = setTimeout(async () => {
                if (newChannel.members.size === 0) {
                    try {
                        await newChannel.delete();
                        console.log(`Canal temporaire supprimé : ${newChannel}`);
                    } catch (error) {
                        console.error('Erreur lors de la suppression du canal temporaire :', error);
                    }
                }
                cooldowns.delete(newChannel.id); // Retirer le canal de la liste des canaux en cooldown
            }, 20000);

            cooldowns.add(newChannel.id); // Ajouter le canal à la liste des canaux en cooldown

        } catch (error) {
            console.error('Erreur lors de la création du canal temporaire :', error);
        }
    },

    async runInteraction(client, interaction) {
        // Vérifier si l'utilisateur est un administrateur (ou a une autre permission appropriée)
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Vous n\'avez pas la permission de créer un canal temporaire.');
        }

        const fetchGuild = await client.getGuild(interaction.guild);

        try {
            const category = await interaction.guild.channels.fetch(fetchGuild.vocParent);

            if (category.type !== 'GUILD_CATEGORY') {
                return interaction.reply('L\'ID fourni ne correspond pas à une catégorie.');
            }

            const user = interaction.user;

            const newChannel = await interaction.guild.channels.create(`Channel de ${user.username}`, {
                type: 'GUILD_VOICE',
                parent: fetchGuild.vocParent,
            });

            interaction.reply(`Canal temporaire créé : ${newChannel}`);

            // Planifier la suppression du canal après 20 secondes s'il est vide
            const timeout = setTimeout(async () => {
                if (newChannel.members.size === 0) {
                    try {
                        await newChannel.delete();
                        console.log(`Canal temporaire supprimé : ${newChannel}`);
                    } catch (error) {
                        console.error('Erreur lors de la suppression du canal temporaire :', error);
                    }
                }
                cooldowns.delete(newChannel.id); // Retirer le canal de la liste des canaux en cooldown
            }, 20000);

            cooldowns.add(newChannel.id); // Ajouter le canal à la liste des canaux en cooldown

        } catch (error) {
            console.error('Erreur lors de la création du canal temporaire :', error);
        }
    }
}
