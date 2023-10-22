const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serveurinfo',
    category: 'information',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'serveurinfo',
    exemples: ['serveurinfo'],
    description: 'Affiche les informations du serveur.',
    async run(client, message, args) {
        // Récupérer les informations du serveur
        const server = message.guild;
        const serverOwner = await server.members.fetch(server.ownerId);
        const roleCount = server.roles.cache.size - 1;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        const stickers = message.guild.stickers.cache;
    
        // Créer un tableau pour stocker les champs de l'embed
        const embedFields = [];
    
        // Vérifier si les informations du serveur sont disponibles avant d'ajouter les champs à l'embed
        if (server && serverOwner) {
            embedFields.push({
                name: '__🌆 | Générale :__',
                value: 
                `
                \n- *Name:* **\`${server.name}\`**
                \n- *ID:* **\`${server.id}\`**
                \n- *Région du serveur:* **\`${server.region}\`**
                \n- *Owner:* **\`${serverOwner.user.tag}\`**
                \n- *Niveau de vérification:* **\`${this.getVerificationLevel(server.verificationLevel)}\`**
                \n- *Created:* **\`${moment(server.createdAt).format('DD/MM/YYYY HH:mm:ss')}\`**
    
                \n*Descritpion:* ***${message.guild.description}***\n
                `
            });
        }
    
        // Vérifier si les informations des membres sont disponibles avant d'ajouter les champs à l'embed
        if (server.memberCount && server.members) {
            embedFields.push({
                name: '__💡 | Utilisateurs :__',
                value:
                `
                \n- *Membres:* **\`${server.memberCount}\`**
                \n- *Nombre de membres en ligne:* **\`${server.members.cache.filter(m => m.presence?.status !== 'offline').size}\`**
                \n- *Nombre de membres hors ligne:* **\`${server.members.cache.filter(m => m.presence?.status === 'offline').size}\`**
                \n- *Bots:* **\`${server.members.cache.filter(member => member.user.bot).size}\`**
                
                \n- Total: **\`${server.memberCount}\`**
                `
            });
        }
    
        // Ajouter les autres champs à l'embed
        embedFields.push({
            name: '__🖊 | Gestion :__',
            value: 
            `
            \n- *Channels text:* **\`${channels.filter(channel => channel.type === 'GUILD_TEXT').size}\`**
            \n- *Channels vocal:* **\`${channels.filter(channel => channel.type === 'GUILD_VOICE').size}\`**
            \n- *Categories:* **\`${channels.filter(channel => channel.type === 'GUILD_CATEGORY').size}\`**
            \n- *Total:* **\`${channels.size}\`**
    
            \n- *Rôles:* **\`${roleCount} rôles\`**
            `
        });
    
        embedFields.push({
            name: '__🖊 | Emojis & Stickers :__',
            value: 
            `
            \n- *Emoji animés:* **\`${emojis.filter(emoji => emoji.animated).size}\`**
            \n- *Emoji statique:* **\`${emojis.filter(emoji => !emoji.animated).size}\`**
            \n- *Stickers:* **\`${stickers.filter(sticker => sticker.type === 'STICKER').size}\`**
            \n- *Total:* **\`${emojis.size}\`**
            `
        });
    
        embedFields.push({
            name: '__✨ | Nitro Statistiques :__',
            value:
            `
            \n- *Level:* **\`${message.guild.premiumTier.replace('TIER_', "")?`${message.guild.premiumTier.replace('TIER_', "")}` : '0'}\`**
            \n- *Boost(s):* **\`${message.guild.premiumSubscriptionCount}\`**
            \n- *Booster(s):* **\`${message.guild.members.cache.filter(member => member.premiumSince).size}\`**
            `
        });
    
        // Créer l'embed en utilisant les champs que vous avez ajoutés
        const serverInfoEmbed = new MessageEmbed()
            .setTitle('Informations du serveur')
            .setColor('#cf1c82')
            .setThumbnail(server.iconURL({ dynamic: true }))
            .addFields(embedFields); // Ajouter les champs à l'embed
    
        // Vérifier si l'embed contient des champs avant de l'envoyer
        if (embedFields.length > 0) {
            // Envoyer l'embed dans le canal où la commande a été utilisée
            message.channel.send({ embeds: [serverInfoEmbed] });
        } else {
            // Si l'embed est vide ou ne contient pas de champs, affichez un message d'erreur ou ne l'envoyez pas du tout.
            message.channel.send("Les informations du serveur ne sont pas disponibles pour le moment.");
        }
    },   
    async runInteraction(client, interaction) {
        // Récupérer les informations du serveur
        const server = interaction.guild;
        const serverOwner = await server.members.fetch(server.ownerId);
        const roleCount = server.roles.cache.size - 1;
        const channels = interaction.guild.channels.cache;
        const emojis = interaction.guild.emojis.cache;
        const stickers = interaction.guild.stickers.cache;
        

        const serverInfoEmbed = new MessageEmbed()
            .setTitle('Informations du serveur')
            .setColor('#cf1c82')
            .setThumbnail(server.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: '__🌆 | Générale :__',
                    value: 
                    `
                    \n- *Name:* **\`${server.name}\`**
                    \n- *ID:* **\`${server.id}\`**
                    \n- *Région du serveur:* **\`${server.region}\`**
                    \n- *Owner:* **\`${serverOwner.user.tag}\`**
                    \n- *Niveau de vérification:* **\`${this.getVerificationLevel(server.verificationLevel)}\`**
                    \n- *Created:* **\`${moment(server.createdAt).format('DD/MM/YYYY HH:mm:ss')}\`**

                    \n*Descritpion:* ${interaction.guild.description}\n
                    `
                },
                {
                    name: '__💡 | Utilisateurs :__',
                    value:
                    `
                    \n- *Membres:* **\`${server.memberCount}\`**
                    \n- *Nombre de membres en ligne:* **\`${server.members.cache.filter(m => m.presence?.status !== 'offline').size}\`**
                    \n- *Nombre de membres hors ligne:* **\`${server.members.cache.filter(m => m.presence?.status === 'offline').size}\`**
                    \n- *Bots:* **\`${server.members.cache.filter(member => member.user.bot).size}\`**
                                    
                    \n- *Total:* **\`${server.memberCount}\`**
                    `
                },
                {
    
                    name: '__🖊 | Gestion :__',
                    value: 
                    `
                    \n- *Channels text:* **\`${channels.filter(channel => channel.type === 'GUILD_TEXT').size}\`**
                    \n- *Channels vocal:* **\`${channels.filter(channel => channel.type === 'GUILD_VOICE').size}\`**
                    \n- *Categories:* **\`${channels.filter(channel => channel.type === 'GUILD_CATEGORY').size}\`**
                    \n- *Total:* **\`${channels.size}\`**
    
                    \n- *Rôles:* **\`${roleCount} rôles\`**
                    `
                },
                {
                    name: '__🖊 | Emojis & Stickers :__',
                    value: 
                    `
                    \n- *Emoji animés:* **\`${emojis.filter(emoji => emoji.animated).size}\`**
                    \n- *Emoji statique:* **\`${emojis.filter(emoji => !emoji.animated).size}\`**
                    \n- *Stickers:* **\`${stickers.filter(stickers => stickers).size}\`**
    
                    \n- *Total:* **\`${emojis.size}\`**
                    `
                },
                {
                    name: '__✨ | Nitro Statistiques :__',
                    value:
                    `
                    \n- *Level:* **\`${interaction.guild.premiumTier.replace('TIER_', "")?`${interaction.guild.premiumTier.replace('TIER_', "")}` : '0'}\`**
                    \n- *Boost(s):* **\`${interaction.guild.premiumSubscriptionCount}\`**
                    \n- *Booster(s):* **\`${interaction.guild.members.cache.filter(member => member.premiumSince).size}\`**
                    `
    
                }
    
            )

        // Répondre à l'interaction avec l'embed
        interaction.reply({ embeds: [serverInfoEmbed] });
    },
    getVerificationLevel(level) {
        switch (level) {
            case 'NONE':
                return 'Aucun';
            case 'LOW':
                return 'Faible';
            case 'MEDIUM':
                return 'Moyen';
            case 'HIGH':
                return 'Élevé';
            case 'VERY_HIGH':
                return 'Très élevé';
            default:
                return 'Inconnu';
        }
    },
};
