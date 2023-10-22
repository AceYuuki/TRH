const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
const Level = require('../../models/level');
const { getLevel } = require('../../utils/levelSystem');

module.exports = {
  name: 'level',
  category: 'information',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'level',
  exemples: ['level'],
  description: 'Affiche votre niveau et votre expérience.',
  async run(client, message, args) {
    // Récupérez le niveau de l'utilisateur en utilisant son ID Discord et l'ID du serveur
    const userLevel = await getLevel(message.author.id, message.guild.id);

    // Créez une image avec canvas
    const canvas = createCanvas(600, 200);
    const ctx = canvas.getContext('2d');

    // Chargez une image d'arrière-plan
    const backgroundUrl = 'https://media.discordapp.net/attachments/1136245230316814457/1136245291922755655/utkarsh-website-banner-background.jpg?width=1200&height=438';
    const background = await loadImage(backgroundUrl);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Dessinez la barre d'expérience arrondie
    const progressBarWidth = (userLevel.experience / (userLevel.level * 100)) * 150; // Ajuster la taille de la barre ici
    const progressBarHeight = 20; // Ajuster la hauteur de la barre ici
    const progressBarX = 250; // Ajuster la position X de la barre ici
    const progressBarY = 170; // Ajuster la position Y de la barre ici
    const progressBarRadius = progressBarHeight / 2;
    ctx.fillStyle = '#FFFFFF'; // Couleur de fond de la barre
    ctx.beginPath();
    ctx.moveTo(progressBarX + progressBarRadius, progressBarY);
    ctx.arcTo(progressBarX + 150, progressBarY, progressBarX + 150, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX + 150, progressBarY + progressBarHeight, progressBarX, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY + progressBarHeight, progressBarX, progressBarY, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY, progressBarX + progressBarWidth, progressBarY, progressBarRadius);
    ctx.closePath();
    ctx.fill();

    // Dessinez la barre d'expérience
    ctx.fillStyle = '#00FF00'; // Couleur de la barre d'expérience (vert ici, vous pouvez changer la couleur)
    ctx.beginPath();
    ctx.moveTo(progressBarX + progressBarRadius, progressBarY);
    ctx.arcTo(progressBarX + progressBarWidth, progressBarY, progressBarX + progressBarWidth, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX + progressBarWidth, progressBarY + progressBarHeight, progressBarX, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY + progressBarHeight, progressBarX, progressBarY, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY, progressBarX + progressBarWidth, progressBarY, progressBarRadius);
    ctx.closePath();
    ctx.fill();

    // Dessinez le texte du niveau
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte
    ctx.font = '20px Arial'; // Police du texte
    const levelText = `Niveau: ${userLevel.level}`;
    const levelTextWidth = ctx.measureText(levelText).width;
    ctx.fillText(levelText, 210 + (100 - levelTextWidth / 2), 150); // Texte du niveau

    // Dessinez le texte de l'expérience actuelle
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte
    ctx.font = '20px Arial'; // Police du texte
    const xpText = `XP: ${userLevel.experience} / ${userLevel.level * 100}`;
    const xpTextWidth = ctx.measureText(xpText).width;
    ctx.fillText(xpText, 210 + (100 - xpTextWidth / 2), 185); // Texte de l'expérience actuelle

    // Chargez l'avatar de l'utilisateur
    const avatar = await loadImage(message.author.displayAvatarURL({ format: 'png' }));

    // Dessinez l'avatar de manière circulaire
    ctx.beginPath();
    ctx.arc(200, 70, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, canvas.width / 2 - 50, 20, 100, 100);

    // Créez une pièce jointe avec l'image de niveau
    const attachment = new MessageAttachment(canvas.toBuffer(), 'level.png');

    // Envoyez l'image de niveau dans le chat
    message.channel.send({ files: [attachment] });
  },
  async runInteraction(client, interaction, guildSettings) {
    // Récupérez le niveau de l'utilisateur en utilisant son ID Discord et l'ID du serveur
    const userLevel = await getLevel(interaction.user.id, interaction.guild.id);

    // Créez une image avec canvas
    const canvas = createCanvas(450, 200);
    const ctx = canvas.getContext('2d');

    // Chargez une image d'arrière-plan
    const backgroundUrl = 'https://media.discordapp.net/attachments/1136245230316814457/1136245291922755655/utkarsh-website-banner-background.jpg?width=1200&height=438';
    const background = await loadImage(backgroundUrl);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Dessinez la barre d'expérience arrondie
    const progressBarWidth = (userLevel.experience / (userLevel.level * 100)) * 150; // Ajuster la taille de la barre ici
    const progressBarHeight = 13; // Ajuster la hauteur de la barre ici
    const progressBarX = 260; // Ajuster la position X de la barre ici
    const progressBarY = 130; // Ajuster la position Y de la barre ici
    const progressBarRadius = progressBarHeight / 2;
    ctx.fillStyle = '#FFFFFF'; // Couleur de fond de la barre
    ctx.beginPath();
    ctx.moveTo(progressBarX + progressBarRadius, progressBarY);
    ctx.arcTo(progressBarX + 150, progressBarY, progressBarX + 150, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX + 150, progressBarY + progressBarHeight, progressBarX, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY + progressBarHeight, progressBarX, progressBarY, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY, progressBarX + progressBarWidth, progressBarY, progressBarRadius);
    ctx.closePath();
    ctx.fill();

    // Dessinez la barre d'expérience
    ctx.fillStyle = '#00FF00'; // Couleur de la barre d'expérience (vert ici, vous pouvez changer la couleur)
    ctx.beginPath();
    ctx.moveTo(progressBarX + progressBarRadius, progressBarY);
    ctx.arcTo(progressBarX + progressBarWidth, progressBarY, progressBarX + progressBarWidth, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX + progressBarWidth, progressBarY + progressBarHeight, progressBarX, progressBarY + progressBarHeight, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY + progressBarHeight, progressBarX, progressBarY, progressBarRadius);
    ctx.arcTo(progressBarX, progressBarY, progressBarX + progressBarWidth, progressBarY, progressBarRadius);
    ctx.closePath();
    ctx.fill();

    // Dessinez le texte du niveau
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte
    ctx.font = '20px Arial'; // Police du texte
    const levelText = `Niveau: ${userLevel.level}`;
    const levelTextWidth = ctx.measureText(levelText).width;
    ctx.fillText(levelText, 210 + (100 - levelTextWidth / 2), 120); // Texte du niveau

    // Dessinez le texte de l'expérience actuelle
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte
    ctx.font = '20px Arial'; // Police du texte
    const xpText = `XP: ${userLevel.experience} / ${userLevel.level * 100}`;
    const xpTextWidth = ctx.measureText(xpText).width;
    ctx.fillText(xpText, 210 + (100 - xpTextWidth / 2), 185); // Texte de l'expérience actuelle

    // Chargez l'avatar de l'utilisateur
    const avatar = await loadImage(interaction.user.displayAvatarURL({ format: 'png' }));

    // Dessinez l'avatar de manière circulaire
    ctx.beginPath();
    ctx.arc(200, 70, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, canvas.width / 2 - 50, 20, 100, 100);

    // Créez une pièce jointe avec l'image de niveau
    const attachment = new MessageAttachment(canvas.toBuffer(), 'level.png');

    // Répondez à l'interaction avec l'image de niveau
    interaction.reply({ files: [attachment] });
  },
};
