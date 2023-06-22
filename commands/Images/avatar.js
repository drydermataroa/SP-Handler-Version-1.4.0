const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
  name: "avatar",
  description: "Get a members avatar",
  emoji: "😎",

  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new EmbedBuilder()
      .setColor(ec.color)
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(`\`Click the button below to download!\``)
      .setFooter({ text: "Request by "+ message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    const row = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
            .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})) 
            .setLabel("PNG")
            .setEmoji("🧸") 
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"}))
            .setLabel("JPG") .setEmoji("🧸")
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "webp"}))
            .setLabel("WEBP") 
            .setEmoji("🧸")
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "gif"})) 
            .setLabel("GIF")
            .setEmoji("🧸")
            .setStyle(ButtonStyle.Link)
        ])

message.channel.send({ embeds: [embed], components: [row]});
    
  },
};