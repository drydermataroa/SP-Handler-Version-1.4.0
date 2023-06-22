const { EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed")
const fetch = require("node-fetch");

module.exports = {
  name: "dadjoke",
  description: "😅 | Tells a random dad joke",
  category: "fun",
  run: async(client, interaction) => {

    const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

    const joke = new EmbedBuilder()
    .setTitle('A Fathers/Dad Joke')
    .setColor(ec.color)
    .setDescription(`${data.attachments[0].fallback}`)
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()

    return interaction.followUp({ embeds: [joke] });
  }
};