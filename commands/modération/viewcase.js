const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'viewcase',
    category: 'modération',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'viewcase [@target] [case]',
    exemples: ['viewcase @Yuukicase'],
    description: 'permet de voir les warns d\'une personne',
    options: [
        {
            name: 'target',
            description: 'L\'utilisateur a warn',
            type: 'USER',
            required: true,
        },
    ],
    async runInteraction(client, interaction, settings){
        const fetchGuild = await client.getGuild(interaction.guild);
        const target = interaction.options.getMember('target', true);

        const filteredUser = fetchGuild.users.filter(u => u.id == target.id);
        if (filteredUser.length == 0 ){
            return interaction.reply({content: 'Cette utilisateur ne possède aucun warn', ephemeral: true});
        }

        let warnList = ' ';
        for (let warn of filteredUser) {
            warnList += `**Case ${warn.case}** [- Par \`${warn.moderator}\` (le ${warn.date}). Raison: \`${warn.reason}\`]\n`
        }
        const embed = new MessageEmbed()
        .setTitle(`__liste des warn pour \`${target.user.tag}\`(${target.id}):__`)
        .setDescription(warnList)
        .setThumbnail(target.displayAvatarURL())
        await interaction.reply({embeds: [embed]});
    }
}