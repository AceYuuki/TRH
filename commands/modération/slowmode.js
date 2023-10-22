const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'slowmode',
    category: 'modération',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'slowmode [amount_in_second]',
    exemples: ['slowmode 15', 'slowmode 50'],
    description: 'Ajouter un RateLImit (slowmode) sur le channel',
     async run(client, message, args) {
        const fetchGuild = await client.getGuild(message.guild);
        const value = args[0];
        if (isNaN(value) || !args[0] ) message.reply('Merci d\'indiquer un `NOMBRE` pour indiquer la durée du slowmode !');

        if (value == 0){
            const embed = new MessageEmbed()
            .setTitle("Salon Ralentit")
            .setDescription(`Le slowmode du salon <#${message.channel.id}> a été déactivé par ${message.member.displayName}`)
            const logChannel = client.channels.cache.get(fetchGuild.modLog);
            logChannel.send({embeds: [embed]});

            await message.channel.setRateLimitPerUser(0);
            return message.reply({content: 'slowmode désactivé !'});
        } else {
            const embed = new MessageEmbed()
            .setTitle("Salon Ralentit")
            .setDescription(`Le slowmode du salon <#${message.channel.id}> a été déactivé par ${message.member.displayName}`)
            const logChannel = client.channels.cache.get(fetchGuild.modLog);
            logChannel.send({embeds: [embed]});
            await message.channel.setRateLimitPerUser(value);
            return message.reply({content: `slowmode activé -> \`${value}\``});
        }
    },
    options: [
        {
            name: 'value',
            description: 'choisir la valeur du slowmode',
            type: 'NUMBER',
            required: true,
        },
    ],
    async runInteraction(client, interaction){
        const value = interaction.options.getNumber('value');
        
        if (value == 0){
            const embed = new MessageEmbed()
            .setTitle("Salon Ralentit")
            .setDescription(`Le slowmode du salon <#${interaction.channel.id}> a été déactivé par ${interaction.member.displayName}`)
            const logChannel = client.channels.cache.get(fetchGuild.modLog);
            logChannel.send({embeds: [embed]});

            await interaction.channel.setRateLimitPerUser(0);
            return interaction.reply({content: 'slowmode désactivé !', ephemeral: true});
        }else {
            const embed = new MessageEmbed()
            .setTitle("Salon Ralentit")
            .setDescription(`Le slowmode du salon <#${interaction.channel.id}> a été activé par \`${interaction.member.displayName}\` pour une durée de \`${value}\` secondes entre chaque message.`)
            const logChannel = client.channels.cache.get(fetchGuild.modLog);
            logChannel.send({embeds: [embed]});

            await interaction.channel.setRateLimitPerUser(value);
            return interaction.reply({content: `slowmode activé -> \`${value}\``, ephemeral: true});
        }
    }
}