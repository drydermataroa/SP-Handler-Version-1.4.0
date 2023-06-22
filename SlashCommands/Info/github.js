const { EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch");
const ec = require("../../settings/embed")

module.exports = {
  name: "github",
  description: "🤖 | Get information about a GitHub user",
  category: "info",
  options: [{
    type: 3,
    name: "username",
    description: "The GitHub username",
    required: true
  }],
  run: async(bot, interaction) => {

    const username = interaction.options.getString("username", true);

    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
    const user = await fetch(url).then((res) => res.json());

    if (user?.message === "Not Found")
      return interaction.followUp(`No github account was found matching \`${query}\`.`);

    const website = user.blog || "N/A";
    const location = user.location || "N/A";
    const bio = user.bio || "N/A";

    const embed = new EmbedBuilder()
      .setTitle(`${user.login} Profile`)
      .setColor(ec.color)
      .addFields(
        { name: "Following", value: user.following.toString(), inline: true },
        { name: "Followers", value: user.followers.toString(), inline: true },
        { name: "Website", value: website, inline: true },
        { name: "Location", value: location, inline: true },
        { name: "URL", value: `[GitHub Link](${user.html_url})` },
      )
      .setDescription(`**Bio** ${bio}`)
      .setThumbnail(user.avatar_url);

    if (user.name) {
      embed.setAuthor({ name: `${user.name}`});
    }

    return interaction.editReply({ embeds: [embed] });
  }
};