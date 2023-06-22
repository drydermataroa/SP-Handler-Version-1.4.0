const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed");
const moment = require("moment");

module.exports = {
    name: 'roleinfo',
    description: '🏅 | Get information off a role.',
    type: 1,
    options: [
        {
            name: "role",
            type: 8,
            description: "The role you want to get the info of!",
            required: true,
        },
    ],
    
    run: async (client, interaction, args) => {
        try {
            const role = interaction.guild.roles.cache.get(args[0]);
            const permissions = {
                "ADMINISTRATOR": "Administrator",
                "VIEW_AUDIT_LOG": "View Audit Log",
                "VIEW_GUILD_INSIGHTS": "View Server Insights",
                "MANAGE_GUILD": "Manage Server",
                "MANAGE_ROLES": "Manage Roles",
                "MANAGE_CHANNELS": "Manage Channels",
                "KICK_MEMBERS": "Kick Members",
                "BAN_MEMBERS": "Ban Members",
                "CREATE_INSTANT_INVITE": "Create Invite",
                "CHANGE_NICKNAME": "Change Nickname",
                "MANAGE_NICKNAMES": "Manage Nicknames",
                "MANAGE_EMOJIS": "Manage Emojis",
                "MANAGE_WEBHOOKS": "Manage Webhooks",
                "VIEW_CHANNEL": "Read Text Channels & See Voice Channels",
                "SEND_MESSAGES": "Send Messages",
                "SEND_TTS_MESSAGES": "Send TTS Messages",
                "MANAGE_MESSAGES": "Manage Messages",
                "EMBED_LINKS": "Embed Links",
                "ATTACH_FILES": "Attach Files",
                "READ_MESSAGE_HISTORY": "Read Message History",
                "MENTION_EVERYONE": "Mention @everyone, @here, and All Roles",
                "USE_EXTERNAL_EMOJIS": "Use External Emojis",
                "ADD_REACTIONS": "Add Reactions",
                "CONNECT": "Connect",
                "SPEAK": "Speak",
                "STREAM": "Video",
                "MUTE_MEMBERS": "Mute Members",
                "DEAFEN_MEMBERS": "Deafen Members",
                "MOVE_MEMBERS": "Move Members",
                "USE_VAD": "Use Voice Activity",
                "PRIORITY_SPEAKER": "Priority Speaker"
            }
            
            const yesno = {
                true: '`Yes`',
                false: '`No`'
            }

        const rolePermissions = role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (rolePermissions.includes(permission)) finalPermissions.push(`✔️ ${permissions[permission]}`);
            else finalPermissions.push(`❌ ${permissions[permission]}`);
        }

        const position = `\`${interaction.guild.roles.cache.size - role.position}\`/\`${interaction.guild.roles.cache.size}\``;
        
        const embed = new EmbedBuilder()
        .setTitle(`__**Role Info**__`)
        .setColor(ec.color)
        .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
        .setImage(ec.image)
        .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 1024}))
        .addFields(
          { name: 'Name', value: `<@&${role.id}>`, inline: true },
          { name: 'ID', value: `\`${role.id}\``, inline: true },
          { name: 'Position', value: `${position}`, inline: true },
          { name: 'Mentionable', value: yesno[role.mentionable], inline: true },
          { name: 'Bot Role', value: yesno[role.managed], inline: true },
          { name: 'Visible', value: yesno[role.hoist], inline: true },
          { name: 'Color', value: `\`${role.hexColor.toUpperCase()}\``, inline: true },
          { name: 'Creation Date', value: `\`${moment(role.createdAt).format('DD/MMM/YYYY')}\``, inline: true },
          { name: 'Permissions', value: `\`\`\`diff\n${finalPermissions.join('\n')}\`\`\`` },
        )
          .setTimestamp()

        interaction.followUp({ embeds: [embed] })
    } catch (error) {
        await interaction.followUp({ content: error.message })
    }
}
}