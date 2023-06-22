const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
const ec = require("../../settings/embed");
const { formatDate } = require('../../structures/Functions/functions');

module.exports = {
  name: 'youngest',
  description: '🙍 | Diplays the youngest account in the server',
  type: 1,

  run: async (client, interaction, args) => {
    let mem = interaction.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => b.user.createdAt - a.user.createdAt).first()

    const embed = new EmbedBuilder()
    .setTitle(`Youngest member in ${interaction.guild.name}`)
    .setColor(ec.color)
    .addFields(
        { name: 'Members Name:', value: `\`\`\`${mem.user.tag}\`\`\``},
        { name: 'Guild Name:', value: `\`\`\`${interaction.guild.name}\`\`\``},
        { name: 'Account Date:', value: `\`\`\`${formatDate(mem.user.createdAt)}\`\`\``},
        { name: 'Join Date:', value: `\`\`\`${moment(mem.user.joinedAt).format("MM-DD-YYYY [at] HH:mm")}\`\`\``},
        )
    .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()

    interaction.followUp( {embeds: [embed]});
  }
}