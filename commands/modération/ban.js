const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ban',
    category: 'modération',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@target] [reason]',
    exemples: ['ban @Yuuki reason'],
    description: 'ban un utilisateur avec une raison',
     async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        if (!args[0]) return message.reply('Spécifiez un membre a ban.');
        if (!args[1]) return message.reply('Spécifiez une raison à votre ban.');

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if (!target.bannable) return message.reply('Ce membre ne peut pas être ban par le bot !');
        const embed = new MessageEmbed()
        .setTitle('Membre Banni')
        .setDescription(`
        **__Membre Banni :__** ${target} 
        **__Modérateur :__** \`${message.member.displayName}\` 
        .**__Raison :__** \`${reason}\`
        `)
        .setFooter({text:'Banni dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

        target.ban({ reason });
        message.channel.send(`Ce membre (${target}) a été banni pendant par la raison suivante: \`${reason}\``);
    },
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur a ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'La raison du ban',
            type: 'STRING',
            required: true,
        }
    ],
    async runInteraction(client, interaction){
        const fetchGuild = await client.getGuild(interaction.guild);
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.bannable) return interaction.reply('Ce membre ne peut pas être ban par le bot !');

        const embed = new MessageEmbed()
        .setTitle('Membre Banni')
        .setDescription(`
        **__Membre Banni :__** ${target} 
        **__Modérateur :__** \`${interaction.member.displayName}\` 
        .**__Raison :__** \`${reason}\`
        `)
        .setFooter({text:'Banni dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

        target.ban({ reason });
        interaction.reply(`Ce membre (${target}) a étébanni par la raison suivante: \`${reason}\``)
    }
}