const { EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed")
const fetch = require("node-fetch");

module.exports = {
  name: "compliment",
  description: "🏆 | Gives a random great compliment.",
  category: "Fun",
  run: async(client, interaction) => {

    const data = await fetch("https://complimentr.com/api").then((res) => res.json());

    const calm = new EmbedBuilder()
    .setTitle('A Random Compliment')
    .setColor(ec.color)
    .setDescription(`${data.compliment}`)
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()

    return interaction.followUp({ embeds: [calm] });
  }
};