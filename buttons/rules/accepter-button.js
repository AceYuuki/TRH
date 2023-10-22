module.exports = {
    name: 'accepter-button',
    async runInteraction(client, interaction) {
        const fetchGuild = await client.getGuild(interaction.guild);
        await interaction.member.roles.add(fetchGuild.rulesRole)
        await interaction.reply({content: `Tu es validé , tu as donc le rôles <@&${fetchGuild.rulesRole}> qui vient d\'être ajouté a ta liste de rôle.`, ephemeral: true})
    }
}