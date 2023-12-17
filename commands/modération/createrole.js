const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'createrole',
    category: 'modération',
    permissions: ['MANAGE_ROLES'],
    ownerOnly: false,
    usage: 'createrole',
    exemples: ['createrole'],
    description: 'createrole un channel',
     async run(client, message, args) {
        const roleName = message.content.split(" ")[1];
        if (!roleName) {
        message.channel.send("Please specify a role name.");
        return;
        }

        try {
        const role = await message.guild.roles.create({
            name: roleName,
            color: 'BLUE', // Vous pouvez changer la couleur ici
            reason: 'Role needed for XYZ'
        });

        message.channel.send(`Le role ${role.name} a été créé avec succès !`);
        } catch (error) {
        console.error(error);
        message.channel.send("Une erreur s'est produite lors de la création du rôle.");
        }
    },
    options: [
        {
            name: 'name',
            description: 'Nom du rôle',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction){
        const roleName = interaction.options.getString('name');

        try {
        const role = await interaction.guild.roles.create({
            name: roleName,
            color: 'BLUE', // Vous pouvez changer la couleur ici
            reason: 'Role needed for XYZ'
        });

        await interaction.reply(`Le role ${role.name} a été créé avec succès !`);
        } catch (error) {
        console.error(error);
        await interaction.reply("Une erreur s'est produite lors de la création du rôle.");
        }
    }
}