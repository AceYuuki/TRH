const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { createTranscript } = require('discord-html-transcripts');

module.exports = {
    name: 'clear',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [nombre] <@target>',
    exemples: ['clear 4', 'clear 4 @Yuuki'],
    description: 'Efface des messages',
    async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        const amountToDelete = args[0];
        if (isNaN(amountToDelete) || !args[0] || amountToDelete > 100 || amountToDelete < 2)
            return message.reply('Le nombre doit être inférieur à 100 et supérieur à 1');

        const target = message.mentions.users.find(u => u.id);

        const messagesToDelete = await message.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg);
                    i++;
                }
            });

            await message.channel.bulkDelete(filteredTargetMessages, true).then(async messages => {
                message.channel.send(`J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}`);

                const logText = `Suppression de messages sur l'utilisateur ${target} dans le channel ${message.channel} (${messages.size} messages)\n`;

                const transcript = await createTranscript(message.channel, {
                    limit: -1,
                    fileName: `message_logs.html`,
                    returnBuffer: false,
                })
                logText.send({files: [transcript] });
            });
        } else {
            await message.channel.bulkDelete(amountToDelete, true).then(async messages => {
                message.channel.send(`J'ai supprimé ${messages.size} messages sur le channel`);

                const logText = client.channels.cache.get(fetchGuild.messageLog);

                logText.send(`Suppression de messages sur le channel ${message.channel} (${messages.size} messages)\n`)

                const transcript = await createTranscript(message.channel, {
                    limit: -1,
                    fileName: `message_logs.html`,
                    returnBuffer: false,
                })
                logText.send({files: [transcript] });
            });
        }
    },
    options: [
        {
            name: 'message',
            description: 'Le nombre de messages à supprimer',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: 'Sélectionner l\'utilisateur pour la suppression de messages',
            type: 'USER',
            required: false,
        },
    ],
    async runInteraction(client, interaction, guildSettings) {
        const fetchGuild = await client.getGuild(interaction.guild);
        const amountToDelete = interaction.options.getNumber('message');
        if (amountToDelete > 100 || amountToDelete < 0)
            return interaction.reply('Le nombre doit être inférieur à 100 et supérieur à 0');

        const target = interaction.options.getMember('target');

        const messagesToDelete = await interaction.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg);
                    i++;
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(async messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}`);

                const logText = `Suppression de messages sur l'utilisateur ${target} dans le channel ${interaction.channel} (${messages.size} messages)\n`;

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    fileName: `message_logs.html`,
                    returnBuffer: false,
                })
                logText.send({files: [transcript] });
            });
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(async messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur le channel`);

                const logText = client.channels.cache.get(fetchGuild.messageLog);

                logText.send(`Suppression de messages sur le channel ${interaction.channel} (${messages.size} messages)\n`)

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    fileName: `message_logs.html`,
                    returnBuffer: false,
                })
                logText.send({files: [transcript] });
    
            });
        }
    },
};
