const { EmbedBuilder } = require('discord.js');
const em = require("../../settings/embed")
const roast = require("../../structures/Json/roast.json")
const emojis = require("../../settings/emojis")

module.exports = {
  name: "roast",
  description: '🤣 | Roast another user in the server.',
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

    const user = interaction.options.getUser("user")
    
    const led = new EmbedBuilder()
    .setTitle(`${emojis.happy} ${interaction.user.username} Just Roasted ${user.username}`)
    .setDescription(`> **Hey ${user}** ${roast[Math.floor(Math.random() * roast.length)]}`)
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setColor(em.color)
    .setTimestamp()

    interaction.followUp({ embeds: [led] })
  }
}