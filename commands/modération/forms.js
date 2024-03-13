const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'forms',
    category: 'modération',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: true,
    usage: 'forms',
    exemples: ['forms'],
    description: 'Envoie le panel pour faire un formulaire',

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ticket Form')
            .setDescription(`
            FR:
            Salut tout le monde !
            Nous avons de passionnantes nouvelles à partager : nous lançons une campagne de recrutement pour renforcer notre équipe de staff ! 🚀
            Si vous êtes quelqu'un de motivé, créatif, et qui a à cœur de contribuer à notre communauté, c'est le moment idéal pour nous rejoindre !
            En tant que membre du staff, vous aurez l'opportunité de façonner l'avenir de notre serveur, de faciliter des événements passionnants, et de créer une expérience exceptionnelle pour tous nos membres.
            Si cela vous intéresse, n'hésitez pas à remplir notre formulaire de candidature en cliquant sur le bouton ci-dessous :

            EN:
            Hello everyone !
            We have exciting news to share: we are launching a recruitment campaign to strengthen our staff team! 🚀
            If you are someone motivated, creative, and committed to contributing to our community, now is the perfect time to join us!
            As a staff member, you will have the opportunity to shape the future of our server, facilitate exciting events, and create an exceptional experience for all of our members.
            If this interests you, do not hesitate to fill out our application form by clicking on the button below:

            Cordialement | Sincerely, 
            `);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('english-forms')
                    .setLabel('English Forms')
                    .setStyle('PRIMARY')
            )

            .addComponents(
                new MessageButton()
                    .setCustomId('french-forms')
                    .setLabel('Formulaire Français')
                    .setStyle('DANGER')
            );

        await message.channel.send({ embeds: [embed], components: [row] });
    },

};
