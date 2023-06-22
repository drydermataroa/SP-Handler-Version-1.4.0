const { EmbedBuilder } = require('discord.js');
const ec = require("../../settings/embed")

module.exports = {
  name: 'top-servers',
  userPermissions: ["Administrator"],
  description: "📤 | Search for the top guilds using your bot.",
  
  run: async(client, interaction) => {
    const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);
    
    const description = guilds.map((guild, index) => {
      return `${index+1}) ${guild.name} -> ${guild.memberCount} members`
    }).join(`\n`)
      
    const embed = new EmbedBuilder()
      .setTitle('**Top Guilds**')
      .setColor(ec.color)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(description)
      .setTimestamp()
      
      interaction.followUp({embeds: [embed]})
  }
}