const { MessageEmbed } = require('discord.js');
const AFK = require('../../models/afk.js');


module.exports = {
    name: 'afk',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'afk <reason>',
    exemples: ['afk en déménagement'],
    description: 'Annonce que l\'utilisateur est afk',
    options: [
        {
            name: 'set',
            description: 'Configure ton status d\'innactivité',
            type: 'SUB_COMMAND',
            options: [ 
                {
                    name: 'status', 
                    type: 'STRING', 
                    description: 'Configure le status', 
                    required: true
                } 
            ]
        },
        {
            name: 'return',
            description: 'revenir après avoir été afk',
            type: 'SUB_COMMAND',
        },
    ],
    async runInteraction(client, interaction) {
     const { guild, options, user, createTimestamp} = interaction;

     const embed = new MessageEmbed()
     .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))

     const afkStatus = options.getString('status');
        
     if (interaction.options.getSubcommand() === 'set') {
        await AFK.findOneAndUpdate(
            {GuildID: guild.id, UserID: user.id},
            {Status: afkStatus, Time: parseInt(createTimestamp / 1000)},
            {new: true, upsert: true}
            )
        embed.setColor("GREEN").setDescription("Votre status d'inactivité à été mise à jour en: " + ` **\`${afkStatus}\`**`);
        return interaction.reply({embeds: [embed], ephemeral: true})
    } else if (interaction.options.getSubcommand() === 'return') {
        await AFK.findOneAndUpdate(
            {GuildID: guild.id, UserID: user.id},
            )
        embed.setColor("RED").setDescription("Votre status d'inactivité à été retiré");
        return interaction.reply({embeds: [embed], ephemeral: true})
    }
    },
  };
  
  
  