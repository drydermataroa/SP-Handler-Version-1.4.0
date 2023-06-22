const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: '📩 | retrieves data about the server.',
  run: async (client, interaction) => {

    const guild = client.guilds.resolve(interaction.guildId)
      const voicechannels = await guild.channels.cache.filter(
                (ch) => ch.type === ChannelType.GuildVoice
            ).size
const textchannels = await guild.channels.cache.filter(
                (ch) => ch.type === ChannelType.GuildText
            ).size

    let embed = new EmbedBuilder()
    .setTitle(`${interaction.guild.name} **Information**`)
    .setColor('#2F3136')
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .addFields(
      { name: '**Server ID:**', value: `\`\`\`${interaction.guild.id}\`\`\``, inline: true},
      { name: '**Total Members:**', value: `\`\`\`${interaction.guild.memberCount}\`\`\``, inline: true},
      { name: '**Total Roles:**', value: `\`\`\`${interaction.guild.roles.cache.size}\`\`\``, inline: true},
      { name: '**Normal Emojis:**', value: `\`\`\`${interaction.guild.emojis.cache.size}\`\`\``, inline: true},
      { name: '**Animated Emojis:**', value: `\`\`\`${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}\`\`\``, inline: true},
      { name: '**Text Channels:**', value: `\`\`\`${textchannels}\`\`\``, inline: true},
      { name: '**Voice Channels:**', value: `\`\`\`${voicechannels}\`\`\``, inline: true},
      { name: '**Total Boost:**', value: `\`\`\`${interaction.guild.premiumSubscriptionCount}\`\`\``, inline: true},
      { name: '**Boost Level:**', value: `\`\`\`${interaction.guild.premiumTier}\`\`\``, inline: true},
      )
    .setAuthor({ name: interaction.guild.name })
    .setTimestamp()
    .setFooter({
      text: `Requested by: ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    })
    interaction.followUp({embeds: [embed]});
  }
}