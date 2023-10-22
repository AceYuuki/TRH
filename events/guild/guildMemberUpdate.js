const { MessageEmbed, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  async execute(client, guild, oldMember, newMember, message) {
    const fetchGuild = await client.getGuild(newMember.guild);
    const channel = client.channels.cache.get(fetchGuild.boostChannel); // Remplacez 'ID_DU_CANAL' par l'ID du canal où vous souhaitez envoyer le message
    if (oldMember && newMember && !oldMember.premiumSince && newMember.premiumSince) {
    // Création de l'image avec le message
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');

    // Fond de l'image
    const background = await loadImage('https://media.discordapp.net/attachments/1097169387770876065/1118662569775878265/fond.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Texte du message
    ctx.font = 'bold 36px MV Boli'; // Police et taille du texte (exemple : gras, 36px)
    ctx.fillStyle = '#FFFFFF'; // Couleur du texte (exemple : blanc)
    ctx.textAlign = 'center'; // Alignement du texte au centre
    ctx.fillText('Le serveur a été boosté !', canvas.width / 2, canvas.height / 1.20);

    // Image du serveur
    const serverIconURL = guild.iconURL({ format: 'png', dynamic: true, size: 128 }); // Obtenir l'URL de l'image du serveur
    const serverIcon = await loadImage(serverIconURL); // Charger l'image du serveur
    const iconSize = 150; // Taille de l'image du serveur
    const iconX = 340; // Position X de l'image du serveur
    const iconY = 100; // Position Y de l'image du serveur

    // Dessiner l'arc de cercle blanc autour de l'image du serveur
    ctx.save();
    ctx.beginPath();
    ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(serverIcon, iconX, iconY, iconSize, iconSize);
    ctx.restore();

    // Logo Discord
    const logo = await loadImage('https://media.discordapp.net/attachments/1097169387770876065/1120171650663596053/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png'); // Charger l'image du logo Discord
    const logoSize = 80; // Taille du logo Discord
    const logoX = canvas.width - logoSize - 10; // Position X du logo Discord
    const logoY = canvas.height - logoSize - 10; // Position Y du logo Discord
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize); // Dessiner le logo Discord sur l'image

    // Enregistrer l'image dans un fichier
    const imageAttachment = new MessageAttachment(canvas.toBuffer(), 'boost.png');

    // Créer un embed avec l'image
    const embed = new MessageEmbed()
      .setColor('#f47fff') // Couleur de l'embed (même que le fond de l'image)
      .setTitle('Nouveau boost de serveur !')
      .setDescription(`Le serveur **__\`${guild.name}\`__** vient d'être boosté !`)
      .setImage('attachment://boost.png');

    // Envoyer le message dans le canal
    await channel.send({
      files: [imageAttachment],
      embeds: [embed]
    });
  }
  }
};
