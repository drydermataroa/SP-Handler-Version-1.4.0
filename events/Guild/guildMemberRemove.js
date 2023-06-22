const client = require('../../index');
const Schema = require('../../structures/Models/welcomeChannel');
const { EmbedBuilder } = require('discord.js')
const moment = require("moment");
const ec = require("../../settings/embed")
const set = require("../../settings/settings")

client.on('guildMemberRemove', async(member) => {

Schema.findOne({ Guild: member.guild.id}, async(e, data) => {
  
  if(!data) return;
  
const user = member.user;
const goodbye = new EmbedBuilder()
.setTitle(`💈 Member Has Left ${member.guild.name} 💈`)
.setColor(ec.color)
.setDescription(`Hope he/she enjoy their stay here....`)
.setImage(set.goodbye)
.addFields(
  { name: `**Name:**`, value: `\`\`\`${user.username}\`\`\``, inline: true },
  { name: `**User ID:**`, value: `\`\`\`${member.guild.id}\`\`\``, inline: true },
  { name: `**User Discrimantor:**`, value: `\`\`\`${user.discriminator}\`\`\``, inline: true },
  { name: '**Joined Server On**:', value: `\`\`\`${moment(member.joinedAt).format('dddd Do MMM YYYY')}\`\`\``, inline: true },
  { name: "**Created On:**", value: `\`\`\`${moment(member.user.createdAt).format('dddd Do MMM YYYY')}\`\`\``, inline: true },
  { name: `**Total Member Count:**`, value: `\`\`\`${member.guild.memberCount}\`\`\``, inline: true },
  )
.setFooter({ text: `Powered By: ${member.guild.name}` })
.setTimestamp()

const channel = member.guild.channels.cache.get(data.Channel)

channel.send({embeds: [goodbye]})
})

})