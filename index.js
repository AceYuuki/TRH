const { Client, Collection, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({intents: 3276799, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']});
const mongoose = require('mongoose');
const Logger = require('./utils/Logger');
['commands', 'buttons', 'selects'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client)});
require('./utils/Function.js')(client);

process.on('exit', code => {
    Logger.client(`le processus s\'est arrêté avec le code : ${code}`)
});
process.on('uncaughtException',(err, origin) => {
    Logger.error(`UNCAUGHT_EXCEPTION ${err}`);
    console.error( `Origine: ${origin}`);
});
process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${reason}\n-----\n`);
    console.log(promise);
});
process.on('warning', (...args) => {Logger.warn(...args)});

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => {Logger.client(' - Connecté à la base de données')}).catch(err => {Logger.error(err)});

client.on('messageCreate', async message => {
  if (!message.mentions.has(client.user)) return;
  if (message.mentions.everyone) return;
      if (message.mentions.has(client.user)) {
      let guildSettings = await client.getGuild(message.guild);
      const prefix = guildSettings.prefix;
      const mentionEmbed = new MessageEmbed()
      .setDescription(`
     **Bonjour, tu viens à l'instant de me mentionner, voici donc les quelques infos sur moi.**
      
      **__Mon préfixe de commande est:__** \`${prefix}\`
      **__Pour voir toutes les commandes:__** \`${prefix}help\` ou \`/help\`
      **__Pour me configurer:__** \`${prefix}dbconfig\` ou \`/dbconfig\`
      `)
      message.channel.send({embeds: [mentionEmbed]})
  }
});

const { getLevel, addExperience } = require('./utils/levelSystem');
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    let guildSettings = await client.getGuild(message.guild);
    const prefix = guildSettings.prefix;
  
    if (!message.content.startsWith(prefix)) {
      // Ajoutez l'expérience chaque fois qu'un message est envoyé
      const experienceToAdd = 10; // Vous pouvez ajuster ce montant en fonction de votre système de niveau
      const userLevel = await addExperience(message.author.id, message.guild.id, experienceToAdd);
  
      console.log(`User: ${message.author.tag}, Level: ${userLevel.level}, Experience: ${userLevel.experience}`);
    }
  });
const { boostImage, boost } = require('ultrax');
boost.init(client);

client.on('boost', async (booster) => {
  const channel = client.channels.cache.get('1173381036957249587');
  const avatar = booster.user.displayAvatarURL({ format: 'png' });
  const boostCard = boostImage(avatar);

  const embed = new MessageEmbed()
    .setDescription(`${booster.user.toString()} a boosté le serveur!`)
    .setImage(boostCard)
    .setColor('#FF39F8');
  channel.send({ embeds: [embed] });
});
  
client.login(process.env.DISCORD_TOKEN);