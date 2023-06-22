const { EmbedBuilder } = require('discord.js');
const flirt = require("../../structures/Json/flirt.json")
const emojis = require("../../settings/emojis")
const em = require("../../settings/embed");

module.exports = {
  name: "flirt",
  description: '💘 | Flirt with another user',
  type: 1,
  options: [
    {
      name: "user",
      description: "Select a user name",
      type: 6,
      required: true
    },
  ],

  run: async(client, interaction, args) => {
    const { options } = interaction;
    const user = interaction.options.getUser("user")
    
    const embed = new EmbedBuilder()
    .setTitle(`${emojis.love} **Funny Random Flirt Messages** ${emojis.love}`)
    .setDescription(`> **Hey ${user}** ${flirt[Math.floor(Math.random() * flirt.length)]}`)
    .setColor(em.color)
    .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()

    interaction.followUp({ embeds: [embed] })
  }
}