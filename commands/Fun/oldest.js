const { EmbedBuilder } = require('discord.js')
const { formatDate } = require('../../structures/Functions/functions');
const ec = require("../../settings/embed");
const moment = require('moment');

module.exports = {
  name: 'oldest',
  description: 'Diplays the oldest account in the server',
  emoji: '🙍',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => a.user.createdAt - b.user.createdAt).first()

    const embed = new EmbedBuilder()
    .setTitle(`Oldest member in ${message.guild.name}`)
    .setColor(ec.color)
    .setTimestamp()
    .addFields(
        { name: 'Members Name:', value: `\`\`\`${mem.user.tag}\`\`\``},
        { name: 'Guild Name:', value: `\`\`\`${message.guild.name}\`\`\``},
        { name: 'Account Date:', value: `\`\`\`${formatDate(mem.user.createdAt)}\`\`\``},
        { name: 'Join Date:', value: `\`\`\`${moment(mem.user.joinedAt).format("MM-DD-YYYY [at] HH:mm")}\`\`\``},
        )
    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })

    message.channel.send({ embeds: [embed] })
  }
}