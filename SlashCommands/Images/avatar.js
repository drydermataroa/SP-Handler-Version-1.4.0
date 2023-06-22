const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed")

module.exports = {
    name: "avatar",
    description : "🧸 | Displays a user's avatar." ,
    type: 1,
    options: [
        {
            type: 6,
            name: "user",
            description : "User to show the avatar." ,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const userAvatar = interaction.options.get("user").user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024
        });

        const embed = new EmbedBuilder()
            .setColor(ec.color)
            .setDescription(`<@${interaction.options.get("user").value}>`)
            .setImage(userAvatar)
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })

        await interaction.followUp({ embeds: [embed] });
    }
};