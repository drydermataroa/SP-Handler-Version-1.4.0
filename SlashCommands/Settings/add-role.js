const rrModel = require('../../structures/Models/reactionRoles')
const { Client, CommandInteraction } = require('discord.js')


module.exports = {
  name: "add-role",
  description: "🎫 | Add role to another user",
  userPermissions: ['Administrator'],
  options: [
    {
      name: "role",
      description: "role to be assigned",
      type: 8,
      required: true
    },
    {
      name: "description",
      description: "description of this role",
      type: 3,
      required: false
    },
    {
      name: "emoji",
      description: "description of this role",
      type: 3,
      required: false
    }
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const role = interaction.options.getRole("role")
    const roleDescription = interaction.options.getString("description") || null;
    const roleEmoji = interaction.options.getString("emoji") || null;
    
    const guildData = await rrModel.findOne({ guildId: interaction.guildId})

    const newRole = {
      roleId: role.id,
      roleDescription,
      roleEmoji,
    }

    if(guildData) {
      const roleData = guildData.roles.find((x) => x.roleId === role.id)

      if(roleData) {
        roleData = newRole;
      } else {
        guildData.roles = [...guildData.roles, newRole]
      }

      await guildData.save()
    } else {
      await rrModel.create({
        guildId: interaction.guildId,
        roles: newRole
      })
    }

    interaction.followUp(`Created a new role: ${role.name}`)
  } 
};