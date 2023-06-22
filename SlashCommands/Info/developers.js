const {  
    EmbedBuilder,
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
  } = require("discord.js")
  const em = require("../../settings/emojis")
  const set = require("../../settings/settings")
  const ec = require("../../settings/embed")

  module.exports = {
    name: "developers",
    description: "🔎 | Get info of the server & bot developers.",
    type: 1,
  
    run: async (client, interaction, args) => {
      const guild = interaction.guild;
      const dev = new EmbedBuilder()
      .setTitle(`${em.lock} __**Developers Info**__ ${em.lock}`)
      .setColor(ec.color)
      .setDescription(
        `> **Bot Owner:** \`\`${set.botOwner}\`\`
         > **Owner Id:** \`\`${set.botOwnerId}\`\`
         > **Developers:** \`\`${set.developers}\`\`
         > **Handler Version:** \`\`${set.handlerVersion}\`\`
         > **Project Name:** <@${client.user.id}>
         > **Guild Name:** \`\`${guild.name}\`\`
         > **Guild Id:** \`\`${set.guildID}\`\``
      )
  
      const row = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder()
          .setURL(set.botInvite)
          .setLabel("Invite")
          .setEmoji("870300130065129472")
          .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
          .setURL(set.website)
          .setLabel("Website")
          .setEmoji("870300130065129472")
          .setStyle(ButtonStyle.Link),
          new ButtonBuilder() 
          .setURL(set.guildInvite)
          .setLabel("Support Server")
          .setEmoji("870300130065129472")
          .setStyle(ButtonStyle.Link),
        ])
  
      interaction.followUp({ embeds: [dev], components: [row]})
    }
  }