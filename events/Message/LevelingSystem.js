const client = require("../../index");
const { EmbedBuilder } = require('discord.js')
const ec = require("../../settings/embed")
const levelrewardSchema = require("../../structures/Models/LevelReward");
const set = require("../../settings/settings")
const levelSchema = require("../../structures/Models/Leveling");
const today = new Date()

client.on('messageCreate', async (message) => {
    if (message.channel.type === 'DM') return;
    if (message.author.bot) return;

    levelSchema.findOne({ guildId: message.guild.id, userId: message.author.id }, async (err, result) => {
      if (!result) {
        levelSchema.create({
          guildId: message.guild.id,
          userId: message.author.id,
          xp: 0,
          level: 0
        })
      }

    });

      const rand = Math.round(Math.random() * 4)
      if (rand === 0) {
        const give = Math.floor(Math.random() * 75)
        //console.log(give, `norm`)
        const data = await levelSchema.findOne({
          guildId: message.guild.id,
          userId: message.author.id
        });

        const requiredXp = data.level * data.level * 100 + 100
        if (data.xp + give >= requiredXp) {
          data.xp += give;
          data.level += 1
          data.save()
          const channel = message.guild.channels.cache.get(set.levelsChannel)
          const levels = new EmbedBuilder()
          .setTitle("💎 **You Have Leveled Up** 💎")
          .setColor(ec.color)
          .setDescription(`${message.author}, You have leveled up to **Level ${data.level}** keep it up...`)
          .addFields(
                { name: `\n`, value: `\n`},
                { name: `**Users XP:**`, value: `\`\`\`${data.xp}\`\`\``, inline: true },
                { name: `**Users Level:**`, value: `\`\`\`${data.level}\`\`\``, inline: true },
                { name: `**Required XP:**`, value: `\`\`\`${data.level * data.level * 100 + 100 }\`\`\``, inline: true },
              )
          .setImage(set.levelGif)
          .setTimestamp()
          channel.send({ embeds: [levels] })
        } else {
          data.xp += give;
          data.save();
        }
        const nextRoleCheck = await levelrewardSchema.findOne({ guildId: message.guild.id, level: data.level })
        if (nextRoleCheck) {
          const levelRole = nextRoleCheck.role.replace(/[<@!&>]/g, '')
          message.member.roles.add(levelRole)
        }
      }
    })