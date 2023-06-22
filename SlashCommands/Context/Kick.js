const { EmbedBuilder } = require('discord.js');
const ec = require('../../settings/embed')

module.exports = {
    name: "Kick User",
    type: 2,
    emoji: "⚔️",
    userPermissions: ['Administrator'],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has('Administrator'))
        return interaction.followUp('You do not have the **Administrator** permission to use this command')

        const user = interaction.guild.members.cache.get(interaction.targetId)

        const kicked = new EmbedBuilder()
        .setTitle(`Kicked From Server`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor(ec.color)
        .setDescription('> User was kicked from the server.')
        .addFields(
            { name: '**Full Name:**', value: `\`\`\`${user.user.tag}\`\`\``, inline: true },
            { name: '**Users ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
            )
        .setTimestamp()
        user.kick();

        return interaction.followUp({ embeds: [kicked] })
    },
};