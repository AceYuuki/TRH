module.exports = {
    name: 'dbconfig',
    category: 'configuration',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: false,
    usage: 'dbconfig [key] <value>',
    exemples: ['dbconfig', 'dbconfig prefix ?', 'dbconfig prefix'],
    description: 'Configurer les données de la base de données',
    async run(client, message, args, guildSettings) {
    if (!args[0] || !args[0].match(/^(prefix|joinChannel|leaveChannel|warnLog|messageLog|ticketLog|serverParent|roleSupport|modLog|leaveJoin|soutient|linkSoutient|vocParent|rulesImage|rulesText|rulesRole|boostChannel|panelText|voiceLog)$/)) return message.reply('Merci d\'entrer un evenement valide (`prefix|joinChannel|leaveChannel|warnLog|messageLog|ticketLog|serverParent|roleSupport|modLog|leaveJoin|soutient|linkSoutient|vocParent|rulesImage|rulesText|rulesRole`)');

    const value = args.slice(1).join(' ');
   
    if (args[0] == 'prefix') {
        if (value) {
            await client.updateGuild(message.guild, {prefix: value});
            return message.reply({content: `Nouvelle valeur du prefix: ${value}`})
        }
        message.reply({ content: `valeur de prefix ${guildSettings.prefix}`})
    } 
    
    else if (args[0] == 'joinChannel') {
        if (value) {
            await client.updateGuild(message.guild, {logChannel: value});
            return message.reply({content: `Nouvelle valeur de joinChannel : ${value}`})
        }
        message.reply({ content: `valeur de joinChannel ${guildSettings.logChannel}`})
       } 
       
       else if (args[0] == 'leaveChannel') {
        if (value) {
            await client.updateGuild(message.guild, {testChannel: value});
            return message.reply({content: `Nouvelle valeur de leaveChannel : ${value}`})
        }
        message.reply({ content: `valeur de leaveChannel ${guildSettings.testChannel}`})
       } 
       
       else if (args[0] == 'warnLog') {
        if (value) {
            await client.updateGuild(message.guild, {warnLog: value});
            return message.reply({content: `Nouvelle valeur de warnLog : ${value}`})
        }
        message.reply({ content: `valeur de warnLog ${guildSettings.warnLog}`})
       } 
       
       else if (args[0] == 'ticketLog') {
        if (value) {
            await client.updateGuild(message.guild, {ticketLog: value});
            return message.reply({content: `Nouvelle valeur de ticketLog : ${value}`})
        }
        message.reply({ content: `valeur de ticketLog ${guildSettings.ticketLog}`})
       } 
       
       else if (args[0] == 'messageLog') {
        if (value) {
            await client.updateGuild(message.guild, {messageLog: value});
            return message.reply({content: `Nouvelle valeur de messageLog : ${value}`})
        }
        message.reply({ content: `valeur de messageLog ${guildSettings.messageLog}`})
       }

       else if (args[0] == 'captchaRole') {
        if (value) {
            await client.updateGuild(message.guild, {captchaRole: value});
            return message.reply({content: `Nouvelle valeur de captchaRole : ${value}`})
        }
        message.reply({ content: `valeur de captchaRole ${guildSettings.captchaRole}`})
       }

       else if (args[0] == 'serverParent') {
        if (value) {
            await client.updateGuild(message.guild, {serverParent: value});
            return message.reply({content: `Nouvelle valeur de serverParent : ${value}`})
        }
        message.reply({ content: `valeur de serverParent ${guildSettings.serverParent}`})
       }

       else if (args[0] == 'roleSupport') {
        if (value) {
            await client.updateGuild(message.guild, {roleSupport: value});
            return message.reply({content: `Nouvelle valeur de roleSupport : ${value}`})
        }
        message.reply({ content: `valeur de roleSupport ${guildSettings.roleSupport}`})
       }
       else if (args[0] == 'modLog') {
        if (value) {
            await client.updateGuild(message.guild, {modLog: value});
            return message.reply({content: `Nouvelle valeur de modLog : ${value}`})
        }
        message.reply({ content: `valeur de modLog ${guildSettings.modLog}`})
       }
       else if (args[0] == 'leaveJoin') {
        if (value) {
            await client.updateGuild(message.guild, {leaveJoin: value});
            return message.reply({content: `Nouvelle valeur de leaveJoin : ${value}`})
        }
        message.reply({ content: `valeur de leaveJoin ${guildSettings.leaveJoin}`})
       }
       else if (args[0] == 'soutient') {
        if (value) {
            await client.updateGuild(message.guild, {soutient: value});
            return message.reply({content: `Nouvelle valeur du soutient: ${value}`})
        }
        message.reply({ content: `valeur de soutient ${guildSettings.soutient}`})
        }
        else if (args[0] == 'linkSoutient') {
            if (value) {
              await client.updateGuild(message.guild, {linkSoutient: value});
              return message.reply({content: `Nouvelle valeur du linkSoutient: ${value}`})
            }  
        message.reply({ content: `valeur de linkSoutient ${guildSettings.linkSoutient}`})
        }
        else if (args[0] == 'vocParent') {
            if (value) {
              await client.updateGuild(message.guild, {vocParent: value});
              return message.reply({content: `Nouvelle valeur du vocParent: ${value}`})
            }  
        message.reply({ content: `valeur de vocParent ${guildSettings.vocParent}`})
        }
        else if (args[0] == 'rulesText') {
            if (value) {
              await client.updateGuild(message.guild, {rulesText: value});
              return message.reply({content: `Nouvelle valeur du rulesText: ${value}`})
            }  
        message.reply({ content: `valeur de rulesText ${guildSettings.rulesText}`})
        }
        else if (args[0] == 'rulesRole') {
            if (value) {
              await client.updateGuild(message.guild, {rulesRole: value});
              return message.reply({content: `Nouvelle valeur du rulesRole: ${value}`})
            }  
        message.reply({ content: `valeur de rulesRole ${guildSettings.rulesRole}`})
        }
        else if (args[0] == 'rulesImage') {
            if (value) {
              await client.updateGuild(message.guild, {rulesImage: value});
              return message.reply({content: `Nouvelle valeur du rulesImage: ${value}`})
            }  
        message.reply({ content: `valeur de rulesImage ${guildSettings.rulesImage}`})
        }
        else if (args[0] == 'boostChannel') {
            if (value) {
              await client.updateGuild(message.guild, {boostChannel: value});
              return message.reply({content: `Nouvelle valeur du boostChannel: ${value}`})
            }  
        message.reply({ content: `valeur de boostChannel ${guildSettings.boostChannel}`})
        }
        else if (args[0] == 'panelText') {
            if (value) {
              await client.updateGuild(message.guild, {panelText: value});
              return message.reply({content: `Nouvelle valeur du panelText: ${value}`})
            }  
        message.reply({ content: `valeur de panelText ${guildSettings.panelText}`})
        }
        else if (args[0] == 'voiceLog') {
            if (value) {
              await client.updateGuild(message.guild, {voiceLog: value});
              return message.reply({content: `Nouvelle valeur du voiceLog: ${value}`})
            }  
        message.reply({ content: `valeur de voiceLog ${guildSettings.voiceLog}`})
        }
    },
    options: [
        {
        name: 'key',
        description: 'Choisir une clé à modifier ou afficher',
        type: 'STRING',
        required: true,
        choices: [
            {
                name: 'prefix',
                value: 'prefix'
            },
            {
                name: 'joinChannel',
                value: 'joinChannel'
            },
            {
                name: 'leaveChannel',
                value: 'leaveChannel'
            },
            {
            name: 'warnLog',
            value: 'warnLog'
            },
            {
                name: 'messageLog',
                value: 'messageLog'
            },
            {
                name: 'ticketLog',
                value: 'ticketLog'
            },
            {
                name: 'captchaRole',
                value: 'captchaRole'
            },
            {
                name: 'roleSupport',
                value: 'roleSupport'
            },
            {
                name: 'serverParent',
                value: 'serverParent'
            },
            {
                name: 'modLog',
                value: 'modLog'
            },
            {
                name: 'leaveJoin',
                value: 'leaveJoin'
            },
            {
                name: 'soutient',
                value: 'soutient'
            },
            {
                name: 'linkSoutient',
                value: 'linkSoutient'
            },
            {
                name: 'vocParent',
                value: 'vocParent'
            },
            {
                name: 'rulesText',
                value: 'rulesText'
            },
            {
                name: 'rulesRole',
                value: 'rulesRole'
            },
            {
                name: 'rulesImage',
                value: 'rulesImage'
            },
            {
                name: 'boostChannel',
                value: 'boostChannel'
            },
            {
                name: 'panelText',
                value: 'panelText'
            },
            {
                name: 'voiceLog',
                value: 'voiceLog'
            },
         ]
        },
        {
            name: 'value',
            description: 'Choisir la nouvelle valeur pour votre clé',
            type: 'STRING',
        }
        
    ],
    async runInteraction(client, interaction, guildSettings){
        const fetchGuild = await client.getGuild(interaction.guild);
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');

        if (key == 'prefix') {
            if (value) {
                await client.updateGuild(interaction.guild, {prefix: value});
                return interaction.reply({content: `Nouvelle valeur du prefix: ${value}`})
            }
            interaction.reply({ content: `valeur de prefix ${guildSettings.prefix}`})
        } 
        
        else if (key == 'joinChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, {joinChannel: value});
                return interaction.reply({content: `Nouvelle valeur de joinChannel : ${value}`})
            }
            interaction.reply({ content: `valeur de joinChannel ${guildSettings.joinChannel}`})
           } 
           
           else if (key == 'leaveChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, {leaveChannel: value});
                return interaction.reply({content: `Nouvelle valeur de leaveChannel : ${value}`})
            }
            interaction.reply({ content: `valeur de leaveChannel ${guildSettings.leaveChannel}`})
           } 
           
           else if (key == 'warnLog') {
            if (value) {
                await client.updateGuild(interaction.guild, {warnLog: value});
                return interaction.reply({content: `Nouvelle valeur de warnLog : ${value}`})
            }
            interaction.reply({ content: `valeur de warnLog ${guildSettings.warnLog}`})
           }

           else if (key == 'messageLog') {
            if (value) {
                await client.updateGuild(interaction.guild, {messageLog: value});
                return interaction.reply({content: `Nouvelle valeur de messageLog : ${value}`})
            }
            interaction.reply({ content: `valeur de messageLog ${guildSettings.messageLog}`})
           }

           else if (key == 'ticketLog') {
            if (value) {
                await client.updateGuild(interaction.guild, {ticketLog: value});
                return interaction.reply({content: `Nouvelle valeur de ticketLog : ${value}`})
            }
            interaction.reply({ content: `valeur de ticketLog ${guildSettings.ticketLog}`})
           }

           else if (key == 'captchaRole') {
            if (value) {
                await client.updateGuild(interaction.guild, {captchaRole: value});
                return interaction.reply({content: `Nouvelle valeur de captchaRole : ${value}`})
            }
            interaction.reply({ content: `valeur de captchaRole ${guildSettings.captchaRole}`})
           }

           else if (key == 'roleSupport') {
            if (value) {
                await client.updateGuild(interaction.guild, {roleSupport: value});
                return interaction.reply({content: `Nouvelle valeur de roleSupport : ${value}`})
            }
            interaction.reply({ content: `valeur de roleSupport ${guildSettings.roleSupport}`})
           }

           else if (key == 'serverParent') {
            if (value) {
                await client.updateGuild(interaction.guild, {serverParent: value});
                return interaction.reply({content: `Nouvelle valeur de serverParent : ${value}`})
            }
            interaction.reply({ content: `valeur de serverParent ${guildSettings.serverParent}`})
           }
           else if (key == 'modLog') {
            if (value) {
                await client.updateGuild(interaction.guild, {modLog: value});
                return interaction.reply({content: `Nouvelle valeur de modLog : ${value}`})
            }
            interaction.reply({ content: `valeur de modLog ${guildSettings.modLog}`})
           }
           else if (key == 'leaveJoin') {
            if (value) {
                await client.updateGuild(interaction.guild, {leaveJoin: value});
                return interaction.reply({content: `Nouvelle valeur de leaveJoin : ${value}`})
            }
            interaction.reply({ content: `valeur de leaveJoin ${guildSettings.leaveJoin}`})
           }
           else if (key == 'soutient') {
            if (value) {
                await client.updateGuild(interaction.guild, {soutient: value});
                return interaction.reply({content: `Nouvelle valeur de soutient : ${value}`})
            }
            interaction.reply({ content: `valeur de soutient ${guildSettings.soutient}`})
           }
           else if (key == 'linkSoutient') {
            if (value) {
                await client.updateGuild(interaction.guild, {linkSoutient: value});
                return interaction.reply({content: `Nouvelle valeur de linkSoutient : ${value}`})
            }
            interaction.reply({ content: `valeur de linkSoutient ${guildSettings.linkSoutient}`})
           } 

           else if (key == 'vocParent') {
            if (value) {
                await client.updateGuild(interaction.guild, {vocParent: value});
                return interaction.reply({content: `Nouvelle valeur de vocParent : ${value}`})
            }
            interaction.reply({ content: `valeur de vocParent ${guildSettings.vocParent}`})
           }  
           else if (key == 'rulesText') {
            
        
                // Répondre à l'interaction avec le texte formaté
                return interaction.reply({ content: `
                Je n'afficherai pas la valeur du texte que vous avez donné. Le texte que vous avez fourni n'affichera pas le formatage du texte que vous avez donné pour votre texte.
Ce que je vous conseille de faire afin de respecter le formattage de votre text (retour à la ligne, saut de ligne, etc ...), c'est d'utiliser la commande dbconfig avec le préfixe afin que la valeur que vous entrez comme texte soit identique à ce que vous avez donnée. 
                ` });
                 
            }
        
           else if (key == 'rulesRole') {
            if (value) {
                await client.updateGuild(interaction.guild, {rulesRole: value});
                return interaction.reply({content: `Nouvelle valeur de rulesRole : ${value}`})
            }
            interaction.reply({ content: `valeur de rulesRole ${guildSettings.rulesRole}`})
           } 
           else if (key == 'rulesImage') {
            if (value) {
                await client.updateGuild(interaction.guild, {rulesImage: value});
                return interaction.reply({content: `Nouvelle valeur de rulesImage : ${value}`})
            }
            interaction.reply({ content: `valeur de rulesImage ${guildSettings.rulesImage}`})
           } 
           else if (key == 'boostChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, {boostChannel: value});
                return interaction.reply({content: `Nouvelle valeur de boostChannel : ${value}`})
            }
            interaction.reply({ content: `valeur de boostChannel ${guildSettings.boostChannel}`})
           } 
           else if (key == 'panelText') {
            
        
            // Répondre à l'interaction avec le texte formaté
            return interaction.reply({ content: `
            Je n'afficherai pas la valeur du texte que vous avez donné. Le texte que vous avez fourni n'affichera pas le formatage du texte que vous avez donné pour votre texte.
Ce que je vous conseille de faire afin de respecter le formattage de votre text (retour à la ligne, saut de ligne, etc ...), c'est d'utiliser la commande dbconfig avec le préfixe afin que la valeur que vous entrez comme texte soit identique à ce que vous avez donnée. 
            ` });
            }
            else if (key == 'voiceLog') {
                if (value) {
                    await client.updateGuild(interaction.guild, {voiceLog: value});
                    return interaction.reply({content: `Nouvelle valeur de voiceLog : ${value}`})
                }
                interaction.reply({ content: `valeur de voiceLog ${guildSettings.voiceLog}`})
               } 
    }
}