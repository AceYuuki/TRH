module.exports = {
    name: 'refuser-button',
    async runInteraction(client, interaction) {
        try {
        await interaction.member.send(`Tu n'as pas accepté les règles, je t'ai donc kick.`)
        } catch(e) {
            await interaction.reply(`Le membre ${interaction.member.displayName} n'a pas accepté les règlse, je l'ai donc kick.`)
        }
        await interaction.member.kick()
    }
}