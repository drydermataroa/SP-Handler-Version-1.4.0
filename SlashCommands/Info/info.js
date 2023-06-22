const { Client, CommandInteraction, EmbedBuilder } = require('discord.js')
const ec = require("../../settings/embed");
const set = require("../../settings/settings");
const em = require("../../settings/emojis")
const moment = require('moment');

module.exports = {
    name: 'info',
    description: '🔍 | Advance information for the current server',
    category: 'info',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      
        const guild = interaction.guild;

       // Owner Variables
        const owner = await guild.fetchOwner();
        const serverOwner = client.users.cache.get(owner.id);

         // Members Variables
        const members = await guild.members.fetch()
        const humans = members.filter(member => !member.user.bot).size
        const bots = members.filter(member => member.user.bot).size

         // Emojis Variables
        const totalEmojis = guild.emojis.cache.size;
        const normalEmojis = guild.emojis.cache.filter((e) => !e.animated).size;
        const animatedEmojis = guild.emojis.cache.filter((e) => e.animated).size;

        // Categories Variables
        const categories = guild.channels.cache.filter((channel) => channel.type === 4 ).size;
        const textChannels = guild.channels.cache.filter((channel) => channel.type === 0 ).size;
        const voiceChannels = guild.channels.cache.filter((channel) => channel.type === 2 ).size;
        const newsChannels = guild.channels.cache.filter((channel) => channel.type === 5 ).size;
        const stageChannels = guild.channels.cache.filter((channel) => channel.type === 13 ).size;
        const totalChannels = categories + textChannels + voiceChannels + newsChannels + stageChannels;

         // Commands Variables
        const slashCommands = client.slashCommands.size
        const commands = client.commands.size

         // Booster Variables
        const boosts = guild.premiumSubscriptionCount

        const boostLevel = guild.premiumTier ? guild.premiumTier : "0";
        const totalBoosts = guild.premiumSubscriptionCount || "0";

        const boosters = members
        .filter( member => {
          return member.premiumSince !== null
        }).size
        const boosterNames = members
        .filter( member => {
          return member.premiumSince !== null
        }).map(member => member.user.tag)

    const info = new EmbedBuilder()
    .setTitle(`**${guild.name} Server Information**`)
    .setColor(ec.color)
    .setAuthor({ name: interaction.guild.name })
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      }) 
    .setDescription(
      `> ${em.sparkles} __**GENERAL INFORMATION**__ ${em.sparkles} \n`+
      `> Here are the info of the current server. For more info please visit our support server or invite our bot below. Thank you.\n`+
      `> \n`+
      `> Join our support server for updates & support: [Support Server](${set.guildInvite})\n`+ 
      `> Invite our bot into your server [Invite Bot](${set.botInvite})\n`+
      `> \n`+
      `> ${em.lock} __**SERVICE INFORMATION**__ ${em.lock}\n`+
      `> <@${client.user.id}> runs on ${Object.keys(require("../../package").dependencies).length} [NPM packages](https://www.npmjs.com)\n`+
      `> **Libary Version:** ${require(`../../package.json`).version}\n`+
      `> \n`+
      `> ${em.location} __**SERVER INFORMATION**__ ${em.location}\n`
    )
    .addFields(
      { name: '> **Server Owner:**', value: `${serverOwner}\n\n` },
      { name: '**Handler Version:**', value: `\`\`\`${set.handlerVersion}\`\`\``, inline: true },
      { name: '**Verified:**', value: `\`\`\`${guild.verified}\`\`\``, inline: true },
      { name: '**Total: Members:**', value: `\`\`\`${guild.memberCount}\`\`\``, inline: true },
      { name: '**Total Humans:**', value: `\`\`\`${humans}\`\`\``, inline: true },
      { name: '**Total Bots:**', value: `\`\`\`${bots}\`\`\``, inline: true },
      { name: '**Total Servers:**', value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true },
      { name: '**Total Slash Commands:**', value: `\`\`\`${slashCommands}\`\`\``, inline: true },
      { name: '**Total Prefix Commands:**', value: `\`\`\`${commands}\`\`\``, inline: true },
      { name: '**Total Roles:**', value: `\`\`\`${guild.roles.cache.size}\`\`\``, inline: true },
      { name: '**Total Channels:**', value: `\`\`\`${totalChannels}\`\`\``, inline: true },
      { name: '**Total Emojis:**', value: `\`\`\`${guild.emojis.cache.size}\`\`\``, inline: true },
      { name: '**Total Boost:**', value: `\`\`\`${interaction.guild.premiumSubscriptionCount}\`\`\``, inline: true},
      { name: '**Boost Level:**', value: `\`\`\`${interaction.guild.premiumTier}\`\`\``, inline: true},
      { name: '**Booster Tier:**', value: `\`\`\`${guild.premiumTier} Tier ${guild.premiumTier}\`\`\``, inline: true },
      { name: '**Progress Bar Enabled:**', value: `\`\`\`${guild.premiumProgressBarEnabled}\`\`\``, inline: true },
      { name: `**Creation Date:**`, value: `\`\`\`${moment(guild.createdTimestamp).format("LT")} ${moment(guild.createdTimestamp).format("LL")} (${moment(guild.createdTimestamp).fromNow()})\`\`\``, inline: false },
      ) 
 //   .setImage(ec.image)  //YOU CAN ADD A IMAGE IF YOU WANT
    .setTimestamp()

    interaction.followUp({ embeds: [info] })
  }
}