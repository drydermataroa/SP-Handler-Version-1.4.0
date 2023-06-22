const { EmbedBuilder } = require('discord.js');
const { tz } = require("moment-timezone");
const ec = require("../../settings/embed")

module.exports = {
  name: "clock",
  description: "⏰ | Shows the time from other countries",
  type: 1,

  run: async(client, interaction, args) => {
    const newYork = tz("America/New_York").format("hh:mm:ss");
    const LosAngeles = tz("America/Los_Angeles").format("hh:mm:ss");
    const Toronto = tz("America/Toronto").format("hh:mm:ss");
    const Chicago = tz("America/Chicago").format("hh:mm:ss");
    const Belgium = tz("Europe/Brussels").format("hh:mm:ss");
    const London = tz("Europe/London").format("hh:mm:ss");
    const Paris = tz("Europe/Paris").format("hh:mm:ss");
    const Berlin = tz("Europe/Berlin").format("hh:mm:ss");
    const Tokyo = tz("Asia/Tokyo").format("hh:mm:ss");
    const Perth = tz("Australia/Perth").format("hh:mm:ss");
    const Sydney = tz("Australia/Sydney").format("hh:mm:ss");
    const Rome = tz("Europe/Rome").format("hh:mm:ss");
    const Singapore = tz("Asia/Singapore").format("hh:mm:ss");
    const NewZealand = tz("Pacific/Auckland").format("hh:mm:ss");

    let embed = new EmbedBuilder()
      .setTitle("🌐 World time zones")
      .addFields(
        { name: `**Los Angeles, US:**`, value:  `\`\`\`${LosAngeles}\`\`\``, inline: true },
        { name: `**New York, US:**`, value:  `\`\`\`${newYork}\`\`\``, inline: true },
        { name: `**Chicago, US:**`, value:  `\`\`\`${Chicago}\`\`\``, inline: true },
        { name: `**Toronto, Canada:**`, value:  `\`\`\`${Toronto}\`\`\``, inline: true },
        { name: `**Brussels, Belgium:**`, value:  `\`\`\`${Belgium}\`\`\``, inline: true },
        { name: `**London, UK:**`, value:  `\`\`\`${London}\`\`\``, inline: true },
        { name: `**Berlin, Germany:**`, value:  `\`\`\`${Berlin}\`\`\``, inline: true },
        { name: `**Paris, France:**`, value:  `\`\`\`${Paris}\`\`\``, inline: true },
        { name: `**Rome, Italy:**`, value:  `\`\`\`${Rome}\`\`\``, inline: true },
        { name: `**Tokyo, Japan:**`, value:  `\`\`\`${Tokyo}\`\`\``, inline: true },
        { name: `**Singapore, Asia:**`, value:  `\`\`\`${Singapore}\`\`\``, inline: true },
        { name: `**Perth, Australia:**`, value:  `\`\`\`${Perth}\`\`\``, inline: true },
        { name: `**Australia, Sydney:**`, value:  `\`\`\`${Sydney}\`\`\``, inline: true },
        { name: `**Auckland New Zealand:**`, value:  `\`\`\`${NewZealand}\`\`\``, inline: true },
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor(ec.color)

    interaction.followUp({embeds: [embed]});
  },
};