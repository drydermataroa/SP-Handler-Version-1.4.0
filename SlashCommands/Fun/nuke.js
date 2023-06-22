const { EmbedBuilder } = require('discord.js');
const em = require("../../settings/emojis")
const ec = require("../../settings/embed")

module.exports = {
  name: "nuke",
  description: '🚀 | Nuke This Server (FAKE)',
  type: 1,
  options: [
    {
      name: "user",
      description: "Select a user to blame",
      type: 6,
      required: true
    },
  ],

  run: async(client, interaction, args) => {

    const user = interaction.options.getUser("user")

    const load = new EmbedBuilder()
    .setTitle(`${em.loading} **Loading Server Data**`)
    .setDescription('Server Getting Nuked In 10 Seconds.')
    .setImage("https://i.imgur.com/i7LjqTu.gif")
    .setColor(ec.wrong)
    
    const embed = new EmbedBuilder()
    .setTitle(`**YOU THINK THIS IS REAL HAHAHAHA**`)
    .setDescription(`**Hahahahaha You Just Got Rick Rolled**`)
    .setImage("https://i.imgur.com/446kxtI.gif")
    .setColor(ec.success)

    interaction.followUp({ embeds: [load] }).then((interaction) => {
      setTimeout(function () {
        interaction.edit({ embeds: [embed]});
      }, 10000)
    })
  }
}