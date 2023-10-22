const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    category: 'modération',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@target] [duration] [reason]',
    exemples: ['mute @Yuuki 4 minutes reason'],
    description: 'mute un utilisateur temporairement avec une raison',
     async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        if (!args[0]) return message.reply('Spécifiez un membre a mute.');
        if (!args[1] || !args[2]) return message.reply('Spécifiez une durée pour votre mute.')
        if (!args[3]) return message.reply('Spécifiez une raison à votre mute.');

        const target = message.mentions.members.find(m => m.id);
        const duration = args.slice(1, 3).join(' ');
        const convertedTime = ms(duration);
        const reason = args.slice(3).join(' ');

        if (!target.moderatable) return message.reply('Ce membre ne peut pas être mute par le bot !');
        if (!convertedTime) return message.reply('Spécifiez une durée valable.');
        const embed = new MessageEmbed()
        .setTitle('Membre Mute')
        .setDescription(`
        **__Membre Mute :__** ${target} 
        **__Modérateur :__** \`${message.member.displayName}\` 
        **__Raison :__** \`${reason}\`
        **__Durée :__** \`${duration}\`
        `)
        .setFooter({text:'Mute dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

        target.timeout(convertedTime, reason);
        message.channel.send(`Ce membre (${target}) a été mute pendant ${duration} par la raison suivante: \`${reason}\``);
    },
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur a mute',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'La raison du mute',
            type: 'STRING',
            required: true,
        },
        {
            name: 'duration',
            description: 'La durée du mute',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction){
        const fetchGuild = await client.getGuild(interaction.guild);
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');
        const duration = interaction.options.getString('duration');
        const convertedTime = ms(duration);

        if (!target.moderatable) return interaction.reply('Ce membre ne peut pas être mute par le bot !');
        if (!convertedTime) return interaction.reply('Spécifiez une durée valable.');
        const embed = new MessageEmbed()
        .setTitle('Membre Mute')
        .setDescription(`
        **__Membre Mute :__** ${target} 
        **__Modérateur :__** \`${interaction.member.displayName}\` 
        **__Raison :__** \`${reason}\`
        **__Durée :__** \`${duration}\`
        `)
        .setFooter({text:'Mute dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

        target.timeout(convertedTime, reason);
        interaction.reply(`Ce membre (${target}) a été mute pendant ${duration} par la raison suivante: \`${reason}\``);
    }
}