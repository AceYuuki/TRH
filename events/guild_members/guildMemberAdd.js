const { welcomeImage } = require('ultrax');
const { Captcha } = require('captcha-canvas');
const { writeFileSync } = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');

 // Fonction asynchrone pour créer le message d'arrivée
 async function createWelcomeMessage(member) {
    // Création du canvas et chargement de l'image de fond
    const canvas = createCanvas(1024, 507);
    const ctx = canvas.getContext('2d');
    const backgroundImagePath = path.join(__dirname, '..', '..', 'fond.jpg');
    const background = await loadImage(backgroundImagePath);
    ctx.drawImage(background, 0, 0, 1024, 507);
  
    // Dessiner le texte de bienvenue
    ctx.font = '42px MV Boli';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'
    ctx.fillText(member.user.tag.toUpperCase(), 512, 410);
  
    ctx.font = '42px MV Boli';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'
    ctx.fillText('Bienvenue !', 512, 450);
  
  
  
  
    //Création de la photo de profile dans l'image canvas
    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.clip();
  
    const avatar = await loadImage(member.user.displayAvatarURL({
      format: "png",
      size: 1024
    }));
  
    ctx.drawImage(avatar, 393, 47, 238, 238);
  
    // Création de la pièce jointe du canvas
    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png');
  
    // Création de l'embed avec la pièce jointe
    const welcomeEmbed = new MessageEmbed()
      .setColor('#FF0381')
      .setTitle(':wave: Heyy !')
      .setDescription(`Bienvenue, ${member} ! Nous sommes heureux de vous voir sur le serveur discord **__${member.guild}__** !`)
      .setImage('attachment://welcome.png')
      .setTimestamp();
  
    // Retourner l'objet contenant l'embed et la pièce jointe
    return { embeds: [welcomeEmbed], files: [attachment] };
  }

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member){
        const fetchGuild = await client.getGuild(member.guild);
        // -------------------------------Message de Bienvenue-----------------------------------------------------------------------------------
       
        const welcomeMessage = await createWelcomeMessage(member);
        const welcomeChannel = client.channels.cache.get(fetchGuild.joinChannel);
       await welcomeChannel.send(welcomeMessage);

       // ----------------------------------- Log de bienvenue -------------------------------------------------------------------------------

       const embed = new MessageEmbed()
       .setAuthor({name: `${member.user.tag} (${member.id})`})
       .setThumbnail(member.user.displayAvatarURL())
       .setColor('GREEN')
       .setDescription(`\n**   **
       ± Nom d'utilisateur: ${member}
       ± Crée le: creation: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
       ± Rejoins le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
       `)
       .setTimestamp()
       .setFooter({text: `L'utilisateur a rejoint  `})
       
       const logChannel = client.channels.cache.get(fetchGuild.leaveJoin);
       logChannel.send({embeds: [embed]});
       
        
        // -------------------------------Captcha-----------------------------------------------------------------------------------

        //const captcha = new Captcha(); //create a captcha canvas of 100x300.
        //captcha.async = true; //Sync
       // captcha.addDecoy(); //Add decoy text on captcha canvas.
        //captcha.drawTrace(); //draw trace lines on captcha canvas.
        //captcha.drawCaptcha(); //draw captcha text on captcha canvas.

        ///const captchaAttachment = new MessageAttachment(
        //    await captcha.png,
        //    "captcha.png"
        //);

        //const captchaEmbed = new MessageEmbed()
        //.setTitle(`Bienvenue sur __${member.guild}__`)
       // .setDescription(`Veuullez compléter le captcha afin d'acceder au reste du serveur !`)
       // .setImage('attachment://captcha.png')

        //const msg = await member.send({
        ///    files: [captchaAttachment],
        //    embeds: [captchaEmbed]
        //});
        //const filter = (message) => {
        //    if (message.author.id !== member.id) return;
         //   if (message.content === captcha.text) return true;
         //   else member.send("mauvais captcha");
        //}
        //try {
         //   const response = await msg.channel.awaitMessages({
           //     filter,
           //     max: 1,
           //     time: 10000,
           //     errors: ["time"],
            //  });

           // if (response) {
          //      member.roles.add(fetchGuild.captchaRole);
          //      msg.channel.send('Captcha Vérifié');
          //  }
       // } catch (err){
         //   await member.send('Tu n\'as pas été vérifié !');
          //  member.kick();
      //  }

    }
}