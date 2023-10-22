const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'addrole',
    category: 'modération',
    permissions: ['MANAGE_ROLES'],
    ownerOnly: false,
    usage: 'addrole [@target] [role]',
    exemples: ['addrole @Yuuki @administrateur'],
    description: 'Ajoute un rôle à un utilisateur',
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur à mentionner',
            type: 'USER',
            required: true,
        },
        {
            name: 'role',
            description: 'Le rôle donné',
            type: 'ROLE',
            required: true,
        }
    ],
     async runInteraction(client, interaction) {
        const fetchGuild = await client.getGuild(interaction.guild);
        const logRole = client.channels.cache.get(fetchGuild.modLog);
        const member = interaction.options.getMember("target");
        const role = interaction.options.getRole("role");

        member.roles.add(role);
        
        const roleEmbed = new MessageEmbed()
        .setDescription(`Vous venez d'ajouter le rôle (${role}) au membre ${member}`)
        .setColor('RANDOM');
        
        interaction.reply({ embeds: [roleEmbed], ephemeral: true });

        const logEmbed = new MessageEmbed()
        .setColor('ORANGE')
        .setTitle('***Ajout d\'un rôle à un utilisateur***')
        .setDescription(`
        **__Cible :__** ${member}
        **__Modérateur :__** ${interaction.member.user.tag}
        **__Rôle :__** ${role}
        `);
        
        logRole.send({ embeds: [logEmbed] });
    },
    async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        const logRole = client.channels.cache.get(fetchGuild.modLog);
        // Vérifie si l'utilisateur a la permission de gérer les rôles
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.channel.send("Vous n'avez pas la permission de gérer les rôles.");
        }

        // Vérifie si les arguments sont fournis correctement
        if (args.length < 2) {
            return message.channel.send("Veuillez mentionner l'utilisateur et spécifier le rôle à ajouter.");
        }

        // Récupère l'utilisateur mentionné
        const member = message.mentions.members.first();
        if (!member) {
            return message.channel.send("Utilisateur invalide. Veuillez mentionner un utilisateur.");
        }

        // Récupère le rôle spécifié
        const role = message.mentions.roles.first();
        if (!role) {
            return message.channel.send("Rôle invalide. Veuillez mentionner un rôle.");
        }

        // Ajoute le rôle à l'utilisateur
        member.roles.add(role)
            .then(() => {
                const roleEmbed = new MessageEmbed()
                    .setDescription(`Vous venez d'ajouter le rôle (${role}) au membre ${member}`)
                    .setColor('RANDOM');

                message.channel.send({ embeds: [roleEmbed] });

                const logEmbed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('***Ajout d\'un rôle à un utilisateur***')
                    .setDescription(`
                    **__Cible :__** ${member}
                    **__Modérateur :__** ${message.author.tag}
                    **__Rôle :__** ${role}
                    `);

                    logRole.send({ embeds: [logEmbed] });
            })
            .catch(error => {
                console.error(`Une erreur s'est produite lors de l'ajout du rôle au membre : ${error}`);
                message.channel.send("Une erreur s'est produite lors de l'ajout du rôle au membre. Veuillez réessayer ultérieurement.");
            });
    },
};