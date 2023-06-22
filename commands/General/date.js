const { EmbedBuilder } = require('discord.js');
const ec = require('../../settings/embed')

module.exports = {
  name: "date",
  emoji: "📅",
  description: "It say Date, Month, Year",
  
  run: async (client, message, args) => {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var years = now.getFullYear();
            
    const days = new EmbedBuilder()
    .setTitle('**Todays Date**')
    .setColor(ec.color)
    .addFields(
      { name: '**Day:**', value: `\`\`\`${day}\`\`\``, inline: true },
      { name: '**Month:**', value: `\`\`\`${month}\`\`\``, inline: true },
      { name: '**Year:**', value: `\`\`\`${years}\`\`\``, inline: true },
      )
    .setTimestamp()

    message.reply({ embeds: [days] })
  }
}