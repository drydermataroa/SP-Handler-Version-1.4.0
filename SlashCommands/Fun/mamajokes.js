const { EmbedBuilder } = require('discord.js');
const em = require("../../settings/emojis")
const insults = require("../../structures/Json/insults.json")
const ec = require("../../settings/embed");

module.exports = {
  name: "mama-jokes",
  description: '🤣 | Receive a random "Your Mom" joke.',
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
    
    const momEmbed = new EmbedBuilder()
    .setTitle(`${em.happy} **Random Mum Jokes** ${em.happy}`)
    .setDescription(`> **Hey ${user}** ${insults[Math.floor(Math.random() * insults.length)]}`)
    .setColor(ec.color)
    .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()

    interaction.followUp({ embeds: [momEmbed] })
  }
}