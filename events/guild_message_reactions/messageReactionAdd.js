module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(client, messageReaction, user) {
        //🟥🟩🟦
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id);
        if (member.user.bot) return;

        if (messageReaction.partial) {
           try {
               await messageReaction.fetch();
           } catch (error) {
               console.log('impossible de récuperer les messages');
               return;
           }
        }

        if (emojiName === '🟥') message.delete();
        if (emojiName === '🟩') message.channel.send('Je test les reactions');
        if (emojiName === '🟦') message.reactions.removeAll();
    }
}