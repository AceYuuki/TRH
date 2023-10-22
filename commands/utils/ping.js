const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');


const contextDescription = {
    userinfo: `Renvoie des infos sur l'utilisateur`
};

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'help',
    exemples: ['help', 'help ping', 'help emit'],
    description: 'commande help',
     run(client, message, args, guildSettings) {
        const prefix = guildSettings.prefix;
        
        if (!args.length){
            const noArgsEmbed1 = new MessageEmbed()
            .setColor('BLUE')
            .addField('__Liste des commandes__', `Une liste de toutes les catégories disponible et leurs commands\nPour plus d'informations sur une commande , taper \`${prefix}help [commande]\`\n** **`)
     
            for(const category of commandFolder){
                noArgsEmbed1.addField( 
                    `|__${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}:__`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``, true
                     );
            };
            return message.channel.send({ embeds: [noArgsEmbed1] });
        };
        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply(`Cette commande n'existe pas !`);

        const argsEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`**__${cmd.name.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}__**`)
        .setDescription(` \`\`\`makefile
[Help Commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les admins du bot uniquement /!\\' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(', ')}
Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.exemples.join(` | ${prefix}`)}

---

${prefix} = prefix utilisé pour le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) facultatif(s)
Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes.
\`\`\` `)
        return message.channel.send({ embeds: [argsEmbed]});
    },
    options: [
        {
        name: 'command',
        description: 'tapez le nom de votre commande',
        type: 'STRING',
        required: false,
        }
    ],
    runInteraction(client, interaction, guildSettings){
        const cmdName = interaction.options.getString('command');
        const prefix = guildSettings.prefix;

        if (!cmdName){
            const noArgsEmbed = new MessageEmbed()
            .setColor('BLUE')
            .addField('__Liste des commandes__', `Une liste de toutes les catégories disponible et leurs commands\nPour plus d'informations sur une commande , taper \`${prefix}help [commande]\`\n** **`)
     
            for(const category of commandFolder){
                noArgsEmbed.addField( 
                    `|__${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}:__`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``,true
                     );
            }
            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true});
        }
        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({content: `Cette commande n'existe pas !`, ephemeral: true });

        const argsEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`**__${cmd.name.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}__**`)
        .setDescription(`
        
\`\`\`makefile
[Help Commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les admins du bot uniquement /!\\' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(', ')}
Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.exemples.join(` | ${prefix}`)}

---

${prefix} = prefix utilisé pour le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) facultatif(s)
Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes.
\`\`\`
        
        `)
        return interaction.reply({ embeds: [argsEmbed], ephemeral: true});
    }
}