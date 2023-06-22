const { EmbedBuilder } = require("discord.js");
const permissions = require("../../structures/Json/perm.json")
const ec = require("../../settings/embed")

module.exports = {
  name: "permissions",
  description: "🔓 | Shows All The Permissions Of The Mentioned One Or Yours",
  type: 1,
  options: [
    {
      type: 6,
      name: "mention",
      description: "Mention The One You Want To View Permissions Of",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const yes = "✅";
    const no = "❌";
    const s = "📛";
    const c = "♨️";

    let channel = interaction.channel;
    let member =
      interaction.options.getMember("mention") ||
      interaction.guild.members.cache.get(interaction.user.id);

    let description = `Server - ${s}\nCurrent Channel - ${c}\n\n${s} | ${c}\n`;

    let embed = new EmbedBuilder()
      .setTitle(`${member.user.username}'s Permissions`)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(ec.color)
    permissions.forEach((perm) => {
      description += `${member.permissions.has(perm) ? yes : no} | ${
        channel.permissionsFor(member.id).has(perm) ? yes : no
      } - ${caps(perm)}\n`;
    });
    embed.setDescription(description);

    return interaction.followUp({ embeds: [embed] });
  },
};

function caps(text) {
  return text
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b[a-zA-Z]/g, (m) => m.toUpperCase());
}