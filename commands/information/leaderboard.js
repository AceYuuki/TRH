const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
const Level = require('../../models/level');
const { getLeaderboard } = require('../../utils/levelSystem');

module.exports = {
  name: 'leaderboard',
  category: 'information',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'leaderboard',
  exemples: ['leaderboard'],
  description: 'Affiche le leaderboard des niveaux et de l\'expérience.',
  async run(client, message, args) {
    // Récupérez le leaderboard des niveaux de l'expérience
    const leaderboard = await getLeaderboard(message.guild.id, 10); // Obtenez les 10 premiers utilisateurs du leaderboard

    // Créez une image avec canvas
    const canvas = createCanvas(600, 400);
    const ctx = canvas.getContext('2d');

    // Chargez une image d'arrière-plan
    const backgroundUrl = 'https://media.discordapp.net/attachments/1097169387770876065/1118662569775878265/fond.jpg';
    const background = await loadImage(backgroundUrl);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Dessinez le titre du leaderboard
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte
    ctx.font = '30px Arial'; // Police du texte
    ctx.fillText('Leaderboard des Niveaux', 150, 50);

    // Dessinez les utilisateurs et leurs niveaux d'expérience
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte
    ctx.font = '20px Arial'; // Police du texte
    let yPosition = 100;
    for (let i = 0; i < leaderboard.length; i++) {
      const userLevel = leaderboard[i];
      const user = await message.guild.members.fetch(userLevel.userId);
      ctx.fillText(`${i + 1}. ${user.user.tag} - Niveau: ${userLevel.level} - XP: ${userLevel.experience}`, 150, yPosition);
      yPosition += 30;
    }

    // Créez une pièce jointe avec l'image du leaderboard
    const attachment = new MessageAttachment(canvas.toBuffer(), 'leaderboard.png');

    // Envoyez l'image du leaderboard dans le chat
    message.channel.send({ files: [attachment] });
  },
};
