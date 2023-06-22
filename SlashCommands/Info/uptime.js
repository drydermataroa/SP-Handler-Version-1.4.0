const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed")
const moment = require("moment");

module.exports = {
  name: "uptime",
  description: "⏰ | Displays Client uptime.",
  category: 'Info',
  type: 1,

  run: async (client, interaction) => {
    const d = moment.duration(interaction.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes =
      d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds =
      d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, "ms").format("dddd, MMMM Do YYYY");

    const replyEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} Uptime`)
      .setDescription(
        `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
      )
      .addFields(
        { name: `**Date Launched:**`, value: date, inline: true },
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor(ec.color);

    interaction.followUp({ embeds: [replyEmbed] });
  },
};