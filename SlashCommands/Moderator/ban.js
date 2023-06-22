const { CommandInteraction, EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed")
const emojis = require("../../settings/emojis")

module.exports = {
    name: "ban",
    description: "🔨 | Ban a user from the server.",
    userPermissions: ['Administrator'],
    type: 1,
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "Select a reason.",
            type: 3,
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, args) => {
      const member = interaction.options.getMember('target');
      const reason = interaction.options.getString('reason');

        

        const response = new EmbedBuilder()
            .setTitle(`${emojis.hammer} __**Succesfully banned the target!**__ ${emojis.hammer}`)
            .setColor(ec.red)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .addFields(
                { name: "ID", value: member.id },
                { name: "Ban Reason", value: reason },
                { name: "Joined Server", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "Account Created", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`, inline: true },
            )
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })

        interaction.followUp({ embeds: [response], ephemeral: true });
        member.ban({ days: 0, reason: reason});
    }
}