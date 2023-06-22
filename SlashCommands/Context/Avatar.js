const { EmbedBuilder } = require('discord.js');
const ec = require("../../settings/embed")

module.exports = {
    name: "Avatar",
    type: 2,
    emoji: "💽",

    run: async (client, interaction, config, db) => {
      const user = interaction.guild.members.cache.get(interaction.targetId);
      
      return interaction.followUp(
        {
          embeds: [
            new EmbedBuilder()
            .setTitle(`${user.user.tag}'s avatar:`)
            .setColor(ec.color)
            .setImage(user.displayAvatarURL(
              {
                dynamic: true
              }
            ))
          ],
          ephemeral: true
        }
      );
    },
};