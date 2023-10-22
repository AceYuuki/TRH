const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member){
    const fetchGuild = await client.getGuild(member.guild);
    

        const embed = new MessageEmbed()
        .setAuthor({name: `${member.user.tag} (${member.id})`})
        .setThumbnail(member.user.displayAvatarURL())
        .setColor('RED')
        .setDescription(`\n**   **
        ± Nom d'utilisateur: ${member.displayName}
        ± Crée le: creation: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        ± Rejoins le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        ± Quitté le: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)

        `)
        .setTimestamp()
        .setFooter({text: `L'utilisateur a quitté  `})
        
        const logChannel = client.channels.cache.get(fetchGuild.leaveJoin);
        logChannel.send({embeds: [embed]});

        //const leaveEmbed = new MessageEmbed()
        //leaveEmbed.addField('╭・─────═──────↝ `⚔️` ↜─────═──────・╮', '** **')
        //leaveEmbed.addField('`🎫` • https://discord.gg/79u3tf9Yu6', `\`👋\` • A la revoyure ${member}`)
        //leaveEmbed.addField(`> Tu viens de quitter le serveur **__⤳ \`🌓\` ︴Oitsukanai__** !`, '> **Nous esperons te revoir un jour parmi nous !**')
        //leaveEmbed.addField('** **', '╰・─────═──────↝ `⚔️` ↜─────═──────・╯')
       // leaveEmbed.setImage('https://media.discordapp.net/attachments/997288759060086806/999650138320556112/6ng452.gif')
        //leaveEmbed.setColor('RANDOM')

        //const leaveChannel = client.channels.cache.get('1016107031477895239');
        //leaveChannel.send({embeds: [leaveEmbed]});
    }
}