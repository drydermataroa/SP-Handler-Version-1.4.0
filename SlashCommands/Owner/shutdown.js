const { EmbedBuilder } = require('discord.js');
const em = require("../../settings/embed")
const emoji = require("../../settings/emojis")

module.exports = {
    name: 'shutdown',
    description: '🔒 | Shutdowns your bot',
    ownerOnly: true,
    type: 1,

    run: async(client, interaction, args) => {

      const shutdown = new EmbedBuilder()
      .setTitle(`${emoji.lock} **Going Offline** ${emoji.lock}`)
      .setColor(em.error)
      .setDescription(`${client.user.username} is shutting down now....`)
      .setFooter({
        text: `Requested by: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
        .setTimestamp()
        client.destroy()

      interaction.followUp({ embeds: [shutdown]})
    }
}