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

const { inviteLogger } = require("ultrax");
inviteLogger.init(client);

client.on('inviteJoin', (member, invite, inviter) => {
  const channel = client.channels.cache.get('1173383656333656264');
  channel.send(`${member.user.tag} rejoint en utilisant le code d'invitation ${invite.code} de ${inviter.tag}. L'invitation a été utilisée ${invite.uses} fois depuis sa création.`); // => Iliannnn#0001 joined using the invite code Dx7aRg7Q from UltraX#0001. Invite was used 1 time(s) since its creation.
});


const twitchClientID = process.env.TWITCH_ID;
const twitchClientSecret = process.env.TWITCH_SECRET;
const twitchUsernames = ['trhyam', 'iyokada']; // Noms d'utilisateur Twitch à surveiller
const notificationChannelId = '1167127156535607406'; // ID du canal Discord pour les notifications

let twitchAccessToken;
let twitchUserIds = {};

async function getTwitchAccessToken() {
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchClientSecret}&grant_type=client_credentials`);
    twitchAccessToken = response.data.access_token;
}

async function getTwitchUserIds() {
    const response = await axios.get(`https://api.twitch.tv/helix/users?login=${twitchUsernames.join('&login=')}`, {
        headers: {
            'Client-ID': twitchClientID,
            'Authorization': `Bearer ${twitchAccessToken}`
        }
    });

    response.data.data.forEach(user => {
        twitchUserIds[user.login] = user.id;
    });
}

let liveStreamIds = new Set(); // Variable pour suivre les streams en direct

async function checkTwitchStreams() {
    try {
        const userIds = Object.values(twitchUserIds).join('&user_id=');
        const response = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${userIds}`, {
            headers: {
                'Client-ID': twitchClientID,
                'Authorization': `Bearer ${twitchAccessToken}`
            }
        });

        const currentStreams = response.data.data;
        const currentStreamIds = new Set(currentStreams.map(stream => stream.id));

        currentStreams.forEach(stream => {
            if (!liveStreamIds.has(stream.id)) { // Vérifie si le stream est nouveau
                const discordChannel = client.channels.cache.get(notificationChannelId);
                if (discordChannel) {
                    discordChannel.send(`Hey @everyone, ${stream.user_name} a commencé à streamer sur Twitch! Allez voir ici : https://www.twitch.tv/${stream.user_login}`);
                }
            }
        });

        liveStreamIds = currentStreamIds; // Met à jour la liste des streams en direct
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
  getTwitchAccessToken,
  getTwitchUserIds,
  checkTwitchStreams
};
  
client.login(process.env.DISCORD_TOKEN);