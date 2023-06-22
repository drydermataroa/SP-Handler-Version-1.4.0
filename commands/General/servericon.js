const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
  name: "servericon",
  aliases: ["icon"],
  description: "Grab the server icon!",
  emoji: "⚙️",

  run: async(client, message, args) => {
  const embed = new EmbedBuilder()
    .setAuthor({ name: message.guild.name })
    .setColor(ec.color)
    .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))
    .setTimestamp()
    .setFooter({ text: ` • Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })

  await message.channel.send({embeds: [embed]});
}
}