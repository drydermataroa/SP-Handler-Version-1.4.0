const { EmbedBuilder } = require('discord.js');
const ec = require('../../settings/embed')

module.exports = {
    name: "Ban User",
    type: 2,
    emoji: "🔨",
    userPermissions: ['Administrator'],
    run: async (client, interaction, config, db) => {
        if(!interaction.member.permissions.has('Administrator'))
        return interaction.followUp('You do not have the **Administrator** permission to use this command')
        
        const user = interaction.guild.members.cache.get(interaction.targetId);

        const banned = new EmbedBuilder()
        .setTitle(`Banned From Server`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor(ec.color)
        .setDescription('> User was banned from the server.')
        .addFields(
            { name: '**Full Name:**', value: `\`\`\`${user.user.tag}\`\`\``, inline: true },
            { name: '**Users ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
            )
        .setTimestamp()
        user.ban();

        return interaction.followUp({ embeds: [banned] })
    },
};