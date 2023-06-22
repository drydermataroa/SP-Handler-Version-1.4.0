const { EmbedBuilder } = require('discord.js')
const levelSchema = require("../../structures/Models/Leveling");
const setupSchema = require("../../structures/Models/LevelingSetup");
const ec = require("../../settings/embed")

module.exports = {
  name: 'xp',
  description: '💎 | Manage a users xp.',
  userPermission: ["Administrator"],
  options: [
    {
      name: 'manage',
      description: 'Manage a users xp and level',
      type: 1,
      options: [
        {
          name: 'action',
          description: 'The action to perform',
          type: 3,
          required: true,
          choices: [{
            name: 'add',
            value: 'add'
          },
          {
            name: 'set',
            value: 'set',
          },
          ],
        },
        {
          name: 'type',
          description: 'Choose to set the level or xp',
          type: 3,
          required: true,
          choices: [
            {
              name: 'level',
              value: 'level'
            },
            {
              name: 'xp',
              value: 'xp'
            },
          ],
        },
        {
          name: 'user',
          description: 'The user to manage',
          type: 6,
          required: true,
        },
        {
          name: 'amount',
          description: 'The amount of xp',
          type: 10,
          required: true,
        },
      ],
    },
  ],


  run: async (client, interaction, args) => {

    const user = interaction.options.getUser('user');
    let amountAdd = interaction.options.getNumber('amount')
    const type = interaction.options.getString('type')

    if (interaction.options.getSubcommand() === 'manage') {
      if (type === 'xp') {
        if (interaction.options.getString('action') === 'add') {

          const data = await levelSchema.findOne({
            guildId: interaction.guild.id,
            userId: user.id
          });

          let walletBalOg;

          if (!data) {
            const newData = await levelSchema.create({
              guildId: interaction.guild.id,
              userId: user.id,
              xp: 0,
              level: 0
            });

            newData.save();
          } else {
            walletBal = data.xp;
            data.xp += amountAdd;
            data.save();
          }

          const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s XP`)
            .setFields({
              name: 'Before:',
              value: `\`${walletBal}\``,
              inline: true
            }, {
                name: 'New Value:',
                value: `\`${data.xp}\``,
                inline: true
              }, {
                name: 'Amount Added:',
                value: `\`${amountAdd}\``,
                inline: true,
              })
            .setColor(ec.color)

          interaction.followUp({ embeds: [embed] })



        } else if (interaction.options.getString('action') === 'set') {

          const data = await levelSchema.findOne({
            guildId: interaction.guild.id,
            userId: user.id
          });

          let walletBalOg;

          if (!data) {
            const newData = await levelSchema.create({
              guildId: interaction.guild.id,
              userId: user.id,
              xp: 0,
              level: 0
            });

            newData.save();
          } else {
            walletBal = data.xp;
            data.xp = amountAdd;
            data.save();
          }

          const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s XP`)
            .setFields({
              name: 'Before:',
              value: `\`${walletBal}\``,
              inline: true
            }, {
                name: 'New Value:',
                value: `\`${data.xp}\``,
                inline: true
              })
            .setColor(ec.color)

          interaction.followUp({ embeds: [embed] })


        }
      } else {
        if (interaction.options.getString('action') === 'add') {

          const data = await levelSchema.findOne({
            guildId: interaction.guild.id,
            userId: user.id
          });

          let walletBalOg;

          if (!data) {
            const newData = await levelSchema.create({
              guildId: interaction.guild.id,
              userId: user.id,
              xp: 0,
              level: 0
            });

            newData.save();
          } else {
            walletBal = data.level;
            data.level += amountAdd;
            data.save();
          }

          const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s level`)
            .setFields({
              name: 'Before:',
              value: `\`${walletBal}\``,
              inline: true
            }, {
                name: 'New Value:',
                value: `\`${data.level}\``,
                inline: true
              }, {
                name: 'Amount Added:',
                value: `\`${amountAdd}\``,
                inline: true,
              })
            .setColor(ec.color)

          interaction.followUp({ embeds: [embed] })



        } else if (interaction.options.getString('action') === 'set') {

          const data = await levelSchema.findOne({
            guildId: interaction.guild.id,
            userId: user.id
          });

          let walletBalOg;

          if (!data) {
            const newData = await levelSchema.create({
              guildId: interaction.guild.id,
              userId: user.id,
              xp: 0,
              level: 0
            });

            newData.save();
          } else {
            walletBal = data.level;
            data.level = amountAdd;
            data.save();
          }

          const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s level`)
            .setFields({
              name: 'Before:',
              value: `\`${walletBal}\``,
              inline: true
            }, {
                name: 'New Value:',
                value: `\`${data.level}\``,
                inline: true
              })
            .setColor(ec.color)


          interaction.followUp({ embeds: [embed] })

        }
      }
    }
  }
}