const { Client, ContextMenuInteraction, EmbedBuilder } = require("discord.js");
const translate = require("translate-google");
const ec = require('../../settings/embed')

module.exports = {
  name: "Translate",
  type: 3,
  emoji: "📋",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    const msg = await interaction.channel.messages.fetch(interaction.targetId);

    translate(msg.content, { to: "english" })
      .then((res) => {
        const replyEmbed = new EmbedBuilder()
          .setTitle("Translate Content  To English")
          .setDescription('> Translate any word in the server....')
          .addFields(
            { name: '**Original Message:**', value: `\`\`\`${msg.content}\`\`\``, inline: true },
            { name: '**Translated Message:**', value: `\`\`\`${res}\`\`\``, inline: true },
            )
          .setColor(ec.color)
          .setTimestamp();

        interaction.followUp({ embeds: [replyEmbed] });
      })
      .catch((err) => {
        interaction.followUp({
          content: "An error occured. Please try again.",
        });
      });
  },
};