const client = require("../../index");
const { EmbedBuilder, cleanCodeBlockContent, ModalSubmitInteraction, InteractionResponseType } = require("discord.js");
const ec = require("../../settings/embed");
const set = require("../../settings/settings");

    ////////////////////////////////////////////
    //SOMEONE INVITED YOUR BOT IN THEIR SERVER//
    ////////////////////////////////////////////

client.on("guildCreate", async guild => {
    let theowner = "NO OWNER DATA! ID: ";
    await guild.fetchOwner().then(({ user }) => { theowner = user; }).catch(() => {})
    let embed = new EmbedBuilder()
      .setColor(ec.color)
      .setTitle(`__**Joined a New Server**__`)
      .setDescription(`${guild.name} has invited your bot into their server`)
      .addFields(
        { name: "**Guild Name:**", value: `\`\`\`${guild.name}\`\`\``, inline: true },
        { name: "**Guild ID:**", value: `\`\`\`${guild.id}\`\`\``, inline: true },
        { name: "**Server Owner Name:**", value: `\`\`\`${theowner.tag}\`\`\``, inline: false },
        { name: "**Server Owner ID:**", value: `\`\`\`${guild.ownerId}\`\`\``, inline: false },
        { name: "**Member Count:**", value: `\`\`\`${guild.memberCount}\`\`\``, inline: true },
        { name: "**Servers Count:**", value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true },
      )
      .setThumbnail(guild.iconURL({dynamic: true}))
      .setFooter({ text: ec.footer, iconURL: ec.iconURL })
      .setTimestamp()
    const botLogs = client.channels.cache.get(set.botLogs) || await client.channels.fetch(botLogs).catch(()=>{}) || false 
    if(set.botLogs) botLogs.send({embeds: [embed]}).catch(console.warn)
  });