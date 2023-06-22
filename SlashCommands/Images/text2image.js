const { EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed")
const allStyles = {
  "3d": "3d",
};

module.exports = {
  name: "text2image",
  description: "📮 | Transform text to image",
  category: "Image",
  options: [
    {
      type: 3,
      name: "text",
      description: "The text that needs to be transformed",
      required: true
    },
    {
      type: 3,
      name: "style",
      description: "The font style",
      required: false,
      choices: Object.entries(allStyles).map(([name, value]) => ({
        name,
        value
      }))
    }
  ],
  run: async(client, interaction) => {
    const text = interaction.options.getString("text", true);
    const style = interaction.options.getString("style", false) ?? "3d";

    const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=${style}-logo&text=${encodeURIComponent(text)}&_loc=generate&imageoutput=true`;
    
    const embed = new EmbedBuilder()
      .setDescription(`[If the image failed to load, click here to view](${image})`)
      .setColor(ec.color)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setImage(image);

    return interaction.followUp({ embeds: [embed] });
  }
};