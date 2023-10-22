const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: 'join',
    category: 'musique',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'setname [channel] [newname]',
    exemples: ['setchannel [Channel de Yuuki] [Team Yuuki]'],
    description: 'Débute ton aventure !',
    async runInteraction(client, interaction){
        joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        interaction.reply({content: 'Je viens actuellement de rejoindre votre channel vocal !'})
    }
}