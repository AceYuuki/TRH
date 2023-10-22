const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    category: 'modération',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@target] [reason]',
    exemples: ['kick @Yuuki reason'],
    description: 'Kick un utilisateur avec une raison',
     async run(client, message, args) {
        if (!args[0]) return message.reply('Spécifiez un membre a kick.');
        if (!args[1]) return message.reply('Spécifiez une raison à votre kick.');

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if (!target.kickable) return message.reply('Ce membre ne peut pas être kick par le bot !');
        
        const embed = new MessageEmbed()
        .setTitle('Membre Kick')
        .setDescription(`
        **__Membre Kick :__** ${target} 
        **__Modérateur :__** \`${message.member.displayName}\` 
        .**__Raison :__** \`${reason}\`
        `)
        .setFooter({text:'Kick dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

        target.kick(reason);
        message.channel.send(`Ce membre (${target}) a été expulsé par la raison suivante: \`${reason}\``);
    },
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur a kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'La raison du kick',
            type: 'STRING',
            required: true,
        }
    ],
    async runInteraction(client, interaction){
        const fetchGuild = await client.getGuild(interaction.guild);
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.kickable) return interaction.reply('Ce membre ne peut pas être kick par le bot !');
        const embed = new MessageEmbed()
        .setTitle('Membre Kick')
        .setDescription(`
        **__Membre Kick :__** ${target} 
        **__Modérateur :__** \`${interaction.member.displayName}\` 
        .**__Raison :__** \`${reason}\`
        `)
        .setFooter({text:'Kick dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});

        target.kick(reason);
        interaction.reply(`Ce membre (${target}) a été expulsé par la raison suivante: \`${reason}\``)
    }
}