const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

module.exports = {
    name: "user-info",
    description: "📙 | Displays information about a user.",
    options: [
        {
            name: 'user',
            description: 'Select a user to get information',
            type: 6,
            required: true,
        },
    ],
    
    run: async(client, interaction, args) => {
    const User = interaction.options.getUser("user")
    
    const TargetedUser = await interaction.guild.members.fetch(
        User.id || interaction.member.id
      );
      await TargetedUser.user.fetch();

      function joinedSuff(number) {
        if (number % 100 >= 11 && number % 100 <= 13) return number + "th";
  
        switch (number % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "th";
        }
        return number + "th";
      }

      const fetchMembers = await interaction.guild.members.fetch();
      const JoinPos =
        Array.from(
          fetchMembers
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .keys()
        ).indexOf(TargetedUser.id) + 1;
  
      const Accent = TargetedUser.user.accentColor
        ? TargetedUser.user.accentColor
        : "Random";
  
      let index = 1;
      let Perm;
      if (TargetedUser.id === interaction.guild.ownerId) {
        Perm = `${emojis.owner} Server Owner`;
      } else if (
        TargetedUser.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        Perm = `${emojis.diamond} Administrator`;
      } else
        Perm = TargetedUser.permissions
          .toArray()
          .map((P) => `${index++}. ${P}.`)
          .join("\n");

      const roles = TargetedUser.roles.cache
        .filter((role) => role.name !== "@everyone")
        .sort((a, b) => b.position - a.position)
        .map((role) => `• ${role.name}`)
        .slice(0, 3);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${TargetedUser.user.username}`,
          iconURL:
            "https://cdn.discordapp.com/attachments/1064929361213530122/1066648072211410964/6879-member.png",
        })
        .setThumbnail(TargetedUser.user.avatarURL({ dynamic: true, size: 1024 }))
        .setColor(ec.color)
        .setFooter({
          text: `Requested by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
           dynamic: true,
           format: "png",
           size: 2048,
          }),
         })
        .setDescription(
          `${emojis.book} **User information:** ${TargetedUser.user}
          
          **${TargetedUser.user.tag}** Joined as the **${joinedSuff(
            JoinPos
          )}** member 
          of this server **${interaction.guild.name}**.
          `
        )
        .addFields(
          {
            name: `${emojis.clipboard} Joined Discord`,
            value: `<t:${parseInt(TargetedUser.user.createdTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: `${emojis.clipboard} Joined Server`,
            value: `<t:${parseInt(TargetedUser.joinedTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: `${emojis.clipboard} Nickname`,
            value: `\`\`\`${TargetedUser.nickname || "None"} \`\`\``,
          },
          {
            name: `${emojis.clipboard} ID`,
            value: `\`\`\` ${TargetedUser.id} \`\`\``,
            inline: true,
          },
          {
            name: `${emojis.clipboard} Color`,
            value: `\`\`\`${
              TargetedUser.user.accentColor
                ? `#${TargetedUser.user.accentColor.toString(16)}`
                : "None"
            }\`\`\``,
            inline: true,
          },
          {
            name: `${emojis.clipboard} Is a Bot`,
            value: `\`\`\`${TargetedUser.user.bot ? "Yes" : "No"} \`\`\``,
            inline: true,
          },
          {
            name: `${emojis.clipboard} Permissions`,
            value: `\`\`\`${Perm}\`\`\``,
          },
          {
            name: `${emojis.clipboard} Top (3)Roles`,
            value: `\`\`\`ansi\n${roles.join("\n")}\`\`\``,
          }
        );
  
      await interaction.followUp({ embeds: [embed] });
    },
  };