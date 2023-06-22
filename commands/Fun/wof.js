const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "wof",
  description: "Play wheel of fortune",
  emoji: "🟢",

  run: async(client, message, args) => {
    try {
      const red =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451941403959358/Red.gif";
      const blue =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451954418888724/Blue.gif";
      const green =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451971514859520/Green.gif";
      const yellow =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451992310235218/Yellow.gif";

      var color1 = "🟥";
      var color2 = "🟦";
      var color3 = "🟩";
      var color4 = "🟨";

      const colors = [`${color1}`, `${color2}`, `${color3}`, `${color4}`];
      const endcolor = colors[Math.floor(Math.random() * colors.length)];

      var color = "";
      var Ecolor = "";

      if (endcolor == color1) {
        color = red;
        Ecolor = "Red";
      }
      if (endcolor == color2) {
        color = blue;
        Ecolor = "Blue";
      }
      if (endcolor == color3) {
        color = green;
        Ecolor = "Green";
      }
      if (endcolor == color4) {
        color = yellow;
        Ecolor = "Yellow";
      }

      const embed = new EmbedBuilder()
        .setTitle(`🎡Wheel of Fortune🎡`)
        .setDescription(
          "__**Pricing:**__\n\n**Red:** Something.\n**Blue:** Something.\n**Green:** Something.\n**Yellow:** Something."
        )
        .setColor(`${Ecolor}`)
        .setImage(`${color}`);

      message.reply({
        embeds: [embed],
      });

      setTimeout(() => message.reply(`The arrow landed on ${endcolor}`), 3000);

    } catch (err) {
      console.log(err);
    }
  },
};
