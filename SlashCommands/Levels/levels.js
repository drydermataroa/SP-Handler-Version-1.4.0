const { EmbedBuilder } = require('discord.js')
const ec = require("../../settings/embed")
const levelSchema = require("../../structures/Models/Leveling");
const setupSchema = require("../../structures/Models/LevelingSetup");
const background = 'https://i.imgur.com/kwZrxuP.gif'

module.exports = {
  name: 'level',
  description: '🥇 | View levels and the leaderboard.',
  options: [
    {
      name: 'view',
      description: 'View the level of you or someone else',
      type: 1,
      options: [
        {
          name: 'user',
          description: 'The user to view',
          type: 6,
          required: false,
        },
      ],
    },
    {
      name: 'leaderboard',
      description: 'Get the top 15 users',
      type: 1,
      options: [
        {
          name: 'type',
          description: 'Choose how to rank the leaderboard',
          type: 3,
          required: true,
          choices: [
            {
              name: 'xp',
              value: 'xp',
            },
            {
              name: 'level',
              value: 'level',
            },
          ],
        },
      ],
    },
  ],

  run: async(client, interaction, args) => {
    const setup = await setupSchema.findOne({ guildId: interaction.guild.id })
    if (interaction.options.getSubcommand() === 'view') {
      if (interaction.options.getUser('user')) {
        const user = interaction.options.getUser('user')

        const userBal = levelSchema.findOne({ userId: user.id }, async (err, bal) => {
          if (!bal) {
            return `I could not find the user in my database`
          }

        });
        const walletBal = await levelSchema.findOne({
          userId: user.id,
          guildId: interaction.guild.id,
        })

        if (!walletBal) {

          const balEmbed = new EmbedBuilder()
            .setTitle(`${user.username}'s level`)
            .setDescription(`${user.tag} does not have a rank. Send some messages to get one`)
            .setColor(ec.color)
            .setFooter({ text: `Requested by ${interaction.user.username}`})
          interaction.followUp({ embeds: [balEmbed] })

          } else {
            const levelview = new EmbedBuilder()
              .setTitle(`**${user.username} level View**`)
              .setThumbnail(user.displayAvatarURL({ dynamic: false, format: 'png' }))
              .setColor(ec.color)
              .setDescription(`Here are your level views....`)
              .addFields(
                { name: `**Users XP:**`, value: `\`\`\`${walletBal.xp}\`\`\``, inline: true },
                { name: `**Users Level:**`, value: `\`\`\`${walletBal.level}\`\`\``, inline: true },
                { name: `**Required XP:**`, value: `\`\`\`${walletBal.level * walletBal.level * 100 + 100 }\`\`\``, inline: true },
              )
              .setImage(background)
              .setFooter({ text: `Requested by: ${interaction.user.username}`})
              interaction.followUp({ embeds: [levelview], })
          }
        }
      } else {
        const user = interaction.user

        const userBal = levelSchema.findOne({ userId: user.id }, async (err, bal) => {
          if (!bal) {
            return `I could not find the user in my database`
          }

        });
        const walletBal = await levelSchema.findOne({
          userId: user.id,
          guildId: interaction.guild.id,
        })

        if (!walletBal) {
          const balEmbed = new EmbedBuilder()
            .setTitle(`${user.username}'s level`)
            .setDescription(`${user.tag} does not have a rank. Send some messages to get one`)
            .setColor(ec.wrong)
            .setFooter({ text: `Requested by ${interaction.user.username}`})
          interaction.followUp({ embeds: [balEmbed] })

    } else if (interaction.options.getSubcommand() === 'leaderboard') {
      if (interaction.options.getString('type') === 'xp') {
        let text = ''
        const results = await levelSchema.find({
          guildId: interaction.guild.id,

        }).sort({
          xp: -1
        }).limit(15)

        for (let counter = 0; counter < results.length; ++counter) {
          const { userId, xp = 0 } = results[counter]

          text += `**#${counter + 1}** <@${userId}> - \`${xp}\`\n`
        }
        const lbEmbed = new EmbedBuilder()
          .setTitle('__**XP Leaderboard**__')
          .setColor(ec.color)
          .setDescription(text)
          .setFooter({ text: `Requested by ${interaction.user.username}`})
        interaction.followUp({ embeds: [lbEmbed] })

      } else {
        let text = ''
        const results = await levelSchema.find({
          guildId: interaction.guild.id,

        }).sort({
          level: -1
        }).limit(15)

        for (let counter = 0; counter < results.length; ++counter) {
          const { userId, level = 0 } = results[counter]

          text += `**#${counter + 1}** <@${userId}> - \`${level}\`\n`
        }
        const lbEmbed = new EmbedBuilder()
          .setTitle('__**Level Leaderboard**__')
          .setColor(ec.color)
          .setDescription(text)
          .setFooter({ text: `Requested by ${interaction.user.username}`})
        interaction.followUp({ embeds: [lbEmbed] })
    }
}
      }
    }
}