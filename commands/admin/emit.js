
module.exports = {
    name: 'emit',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'emit',
    exemples: ['emit [eventName]'],
    description: 'emet un evenement',
     run(client, message, args) {
    if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove|guildCreate|voiceStateUpdate|guildMemberUpdate)$/)) return message.reply('Merci d\'entrer un evenement valide (`guildMemberRemove``)');
   
    if (args[0] == 'guildMemberAdd') {
       client.emit('guildMemberAdd', message.member);
       message.reply('Event guildMemberAdd emit !');
   } else if (args[0] == 'guildCreate') {
    client.emit('guildCreate', message.guild);
    message.reply('Event guildCreate emit !');
   }    else if (args[0] == 'voiceStateUpdate') {
    client.emit('voiceStateUpdate', message.guild);
    message.reply('Event voiceStateUpdate emit !');
   }    else if (args[0] == 'guildMemberUpdate') {
    client.emit('guildMemberUpdate', message.guild);
    message.reply('Event guildMemberUpdate emit !');
   }    
   else {
        client.emit('guildMemberRemove', message.member);
        message.reply('Event guildMemberRemove emit !');
   } 
    },
    options: [
        {
        name: 'event',
        description: 'Choisir un événement à émettre',
        type: 'STRING',
        required: true,
        choices: [
            {
                name: 'guildMemberAdd',
                value: 'guildMemberAdd'
            },
            {
                name: 'guildMemberRemove',
                value: 'guildMemberRemove'
            },
            {
                name: 'guildCreate',
                value: 'guildCreate'
            },
            {
                name: 'voiceStateUpdate',
                value: 'voiceStateUpdate'
            },
            {
                name: 'guildMemberUpdate',
                value: 'guildMemberUpdate'
            },
        ]
        }
    ],
    runInteraction(client, interaction){
        const evtChoices = interaction.options.getString('event');

        if (evtChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event guildMemberAdd emit !', ephemeral: true});
        } else if (evtChoices == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({ content: 'Event guildCreate emit !', ephemeral: true});
           }  else if (evtChoices == 'voiceStateUpdate') {
            client.emit('voiceStateUpdate', interaction.guild);
            interaction.reply({ content: 'Event voiceStateUpdate emit !', ephemeral: true});
           }  else if (evtChoices == 'guildMemberUpdate') {
            client.emit('guildMemberUpdate', interaction.guild);
            interaction.reply({ content: 'Event guildMemberUpdate emit !', ephemeral: true});
           }  
        else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event guildMemberRemove emit !', ephemeral: true});
        } 
    }
}