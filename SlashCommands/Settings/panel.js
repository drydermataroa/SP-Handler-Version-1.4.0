const { Client, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const ec = require("../../settings/embed");
const rrModel = require('../../structures/Models/reactionRoles')

module.exports = {
  name: "panel",
  description: "💎 | reaction role panel",
  userPermissions: ['Administrator'],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const guildData = await rrModel.findOne({ 
      guildId: interaction.guildId
    });

    if (!guildData?.roles)
    return interaction.followUp(
      "There is no roles inside of this server!"
    );

    const options = guildData.roles.map(x => {
      const role = interaction.guild.roles.cache.get(x.roleId);

      return {
        label: role.name,
        value: role.id,
        description: x.roleDescription || 'NO description',
        emoji: x.roleEmoji
      };
    });
              //YOU CAN EDIT THIS EMBED IF YOU WANT
    const panelEmbed = new EmbedBuilder()
      .setTitle('__**Reaction Roles**__')
      .setThumbnail("https://i.imgur.com/ZFH5OtF.png")
      .setColor(ec.color)
      .setDescription('**Please select a role below**\nThese roles will give you access to the server and announcement pings')
      .setImage(ec.image)
      .setTimestamp()

    const components = [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
           .setCustomId('reaction-roles') //<== DO NOT REMOVE THIS
           .setMaxValues(1)
           .addOptions(options)
      )
    ];

    interaction.followUp({ embeds: [ panelEmbed], components })

  }
};