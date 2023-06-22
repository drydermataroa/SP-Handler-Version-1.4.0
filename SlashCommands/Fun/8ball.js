const { EmbedBuilder } = require('discord.js');
const ball = require("../../structures/Json/8ball.json")
const emojis = require("../../settings/emojis")
const em = require("../../settings/embed");

module.exports = {
  name: "8ball",
  description: '🎱 | Ask any questions and the bot will answer for you in text.',
  type: 1,
  options: [
    {
      name: "question",
      description: "Your Question",
      type: 3,
      required: true
    },
  ],

  run: async(client, interaction, args) => {
    const { options } = interaction;
    const answer = interaction.options.getString("question")
    
    const embed = new EmbedBuilder()
    .setTitle(`${emojis.book} **8Ball Questions/Answer** ${emojis.book}`)
    .setDescription(`> **${answer}** ${ball[Math.floor(Math.random() * ball.length)]}`)
    .setColor(em.color)
    .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()

    interaction.followUp({ embeds: [embed] })
  }
}