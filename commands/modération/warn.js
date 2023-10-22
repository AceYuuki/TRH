const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'warn',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'warn [@target] [reason]',
    exemples: ['warn @Yuuki reason'],
    description: 'warn un utilisateur avec une raison',
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur a warn',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'La raison du warn',
            type: 'STRING',
            required: true,
        }
    ],
    async runInteraction(client, interaction, settings){
        const fetchGuild = await client.getGuild(interaction.guild);
        const target = interaction.options.getMember('target', true);
        const reason = interaction.options.getString('reason');

        const embed = new MessageEmbed()
        .setAuthor({name:`[WARN] ${target.displayName}`, iconURL: target.displayAvatarURL()})
        .setDescription(`
        Utilisateur warn : ${target}
        Modérateur : ${interaction.member.displayName}
        Raison : ${reason}
        `)
        .setColor('#2f3136')
        .setTimestamp()


        const userArray = fetchGuild.users;

        const user = {
            case: (userArray.length + 1),
            name: target.displayName,
            id: target.id,
            moderator: interaction.user.tag,
            reason: reason,
            date: dayjs().format("DD/MM/YYYY - HH:mm")
        }

        userArray.push(user);
        await client.updateGuild(interaction.guild, {users: userArray});

        const logChannel = client.channels.cache.get(fetchGuild.warnLog);
        logChannel.send({embeds: [embed]});
        interaction.reply({content:'ce membre a été warn', ephemeral: true})
    }
}