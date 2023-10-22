const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unmute',
    category: 'modération',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@target]',
    exemples: ['unmute @Yuuki'],
    description: 'Unmute un utilisateur',
     async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        if (!args[0]) return message.reply('Spécifiez un membre a unmute.');

        const target = message.mentions.members.find(m => m.id);

        if (!target.isCommunicationDisabled()) return message.reply('Ce membre ne peut pas être unmute par le bot car il n\'est pas mute !');
        const embed = new MessageEmbed()
        .setTitle('Membre Unmute')
        .setDescription(`
        **__Membre Unmute :__** ${target} 
        **__Modérateur :__** \`${message.member.displayName}\`
        `)
        .setFooter({text:'Unmute dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});
        target.timeout(null);
        message.channel.send(`Ce membre (${target}) a été unmute`);
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
            description: 'Indique la raison du unmute',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction){
        const fetchGuild = await client.getGuild(interaction.guild);
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason')
        if (!target.isCommunicationDisabled()) return interaction.reply('Ce membre ne peut pas être unmute par le bot car il n\'est pas mute !');
        const embed = new MessageEmbed()
        .setTitle('Membre Unmute')
        .setDescription(`
        **__Membre Unmute :__** ${target} 
        **__Modérateur :__** \`${interaction.member.displayName}\` 
        **__Raison :__** \`${reason}\`
        `)
        .setFooter({text:'Unmute dernièrement le :'}).setTimestamp()
        .setThumbnail(`${target.displayAvatarURL({ format: 'png', dynamic: true })}`)
        const logChannel = client.channels.cache.get(fetchGuild.modLog);
        logChannel.send({embeds: [embed]});
        target.timeout(null);
        interaction.reply(`Ce membre (${target}) a été unmute.`);
    }
}