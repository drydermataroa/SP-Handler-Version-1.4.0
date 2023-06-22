const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
 name: 'serverslist',
 description: 'This shows lists of servers who invited your bot and member counts',
 emoji: '📝',
 userPerms: ['Administrator'],
 
 run: async (client, message, args) => {
  
  let i0 = 0;
  let i1 = 10;
  let page = 1;
  
  let description;
  
  description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
  .map(r => r)
  .map((r, i) => `**${i + 1})** ${r.name}  \`(${r.memberCount} Members)\``)
  .slice(0, 10)
  .join("\n");
  
  let emb = new EmbedBuilder()
  .setColor(ec.color)
  .setFooter({ text: ` • Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })
  .setDescription(description);
  
  let pages = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("⬅️")
    .setCustomId("previous"),
    new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("➡️")
    .setCustomId("next")
    )
    
  let dis = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("⬅️")
    .setDisabled(true)
    .setCustomId("previous"),
    new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("➡️")
    .setDisabled(true)
    .setCustomId("next")
    )  
    
    if(client.guilds.cache.size < 10) return message.channel.send({
      embeds: [emb],
      components: [dis]
    }) 
    
    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });
    
    let filter = (i) => i.user.id === message.author.id;

    let collector = msg.createMessageComponentCollector({
      filter
    });
    
    collector.on("collect", async (i) => {
      if (i.customId === "previous") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        
    if (i1 < 9) return msg.delete();

    description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
    .map(r => r)
    .map((r, i) => `**${i + 1})** ${r.name} \`(${r.memberCount} Members)\``)
    .slice(i0, i1)
    .join("\n");
    
    emb.setFooter({ text: `Page ${page}/${Math.round(client.guilds.cache.size / 10)}`})
    .setDescription(description);
    
    msg.edit({
      embeds: [emb]
    });
  }
  
  if (i.customId === "next") {
    
    i0 = i0 + 10;
    i1 = i1 + 10;
    page = page + 1;
    
    if (i1 > client.guilds.cache.size + 10) return msg.delete();   
    if (!i0 || !i1) return msg.delete();
    
    description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
    .map(r => r)
    .map((r, i) => `**${i + 1})** ${r.name} \`( ${r.memberCount} Members)\``)
    .slice(i0, i1)
    .join("\n");
    
    emb.setFooter({ text: `Page ${page}/${Math.round(client.guilds.cache.size / 10)}`})
    .setDescription(description)
    msg.edit({
      embeds: [emb]
    })
  }
})
 }
}