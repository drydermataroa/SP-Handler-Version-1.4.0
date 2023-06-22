const { EmbedBuilder } = require('discord.js');
const ec = require('../../settings/embed')
const moment = require("moment");

module.exports = {
    name: "User Info",
    type: 2,
    emoji: "📊",

    run: async (client, interaction, config, db) => {
        
        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Bot type handler:
        const bot = {
            true: "Yes",
            false: "No"
        };

        const info = new EmbedBuilder()
        .setTitle(`${user.user.tag}'s Info`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor(ec.color)
        .addFields(
            { name: '**Full Name:**', value: `\`\`\`${user.user.tag}\`\`\``, inline: true },
            { name: '**Users ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
            { name: '**Self Bot:**', value: `\`\`\`${bot[user.user.bot]}\`\`\``, inline: true },
            { name: '**Joined Server On:**', value: `\`\`\`${moment(user.joinedAt).format('dddd Do MMM YYYY')}\`\`\``, inline: false },
            { name: '**Created On:**', value: `\`\`\`${moment(user.user.createdAt).format('dddd Do MMM YYYY')}\`\`\``, inline: false },
            )
        .setTimestamp()

        return interaction.followUp({ embeds: [info] })
    },
};