const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unban-command',
    category: 'modération',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'unban [userID] [reason]',
    exemples: ['unban 1234567890 Reason for unban'],
    description: 'Débanne un utilisateur avec une raison.',
    async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        if (!args[0]) return message.reply('Veuillez spécifier l\'ID d\'un utilisateur à débannir.');
        if (!args[1]) return message.reply('Veuillez spécifier une raison pour le débanissement.');

        const userID = args[0];
        const reason = args.slice(1).join(' ');

        try {
            const bannedUsers = await message.guild.bans.fetch();
            const bannedUser = bannedUsers.find(user => user.user.id === userID);

            if (!bannedUser) return message.reply('Cet utilisateur n\'est pas banni.');

            await message.guild.members.unban(userID, reason);

            const embed = new MessageEmbed()
            .setTitle('Membre Débanni')
            .setDescription(`
            **__Membre Débanni :__** <@${userID}>
            **__Modérateur :__** \`${message.member.displayName}\` 
            **__Raison :__** \`${reason}\`
            `)
        .setFooter({text:'Banni dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

            message.channel.send(`L'utilisateur avec l'ID \`${userID}\` a été débanni pour la raison suivante : \`${reason}\``);
        } catch (error) {
            console.error(error);
            message.reply('Une erreur s\'est produite lors de la tentative de débanissement de l\'utilisateur.');
        }
    },
    options: [
        {
            name: 'user-id',
            description: 'L\'ID de l\'utilisateur à débannir',
            type: 'STRING',
            required: true,
        },
        {
            name: 'reason',
            description: 'La raison du débanissement',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const fetchGuild = await client.getGuild(interaction.guild);
        const userID = interaction.options.getString('user-id');
        const reason = interaction.options.getString('reason');

        try {
            const bannedUsers = await interaction.guild.bans.fetch();
            const bannedUser = bannedUsers.find(user => user.user.id === userID);

            if (!bannedUser) return interaction.reply('Cet utilisateur n\'est pas banni.');

            await interaction.guild.members.unban(userID, reason);

            const embed = new MessageEmbed()
            .setTitle('Membre Débanni')
            .setDescription(`
            **__Membre Banni :__** <@${userID}> 
            **__Modérateur :__** \`${interaction.member.displayName}\` 
            **__Raison :__** \`${reason}\`
            `)
        .setFooter({text:'Banni dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

            interaction.reply(`L'utilisateur avec l'ID \`${userID}\` a été débanni pour la raison suivante : \`${reason}\``);
        } catch (error) {
            console.error(error);
            interaction.reply('Une erreur s\'est produite lors de la tentative de débanissement de l\'utilisateur.');
        }
    },
};
