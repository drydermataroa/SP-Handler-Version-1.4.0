const client = require("../../index");
const rrModel = require('../../structures/Models/reactionRoles')

client.on("interactionCreate", async (interaction) => {
    ///////////////////////////////
    /// Reaction Roles Handling ///
    ///////////////////////////////
    if(interaction.isAnySelectMenu()) {
      if(interaction.customId !== 'reaction-roles') return;
      await interaction.deferReply({ ephermal: true })
      const wait = require('util').promisify(setTimeout)
      const roleId = interaction.values[0];
      const role = interaction.guild.roles.cache.get(roleId)
      const memberRoles = interaction.member.roles;
      
      const hasRole = memberRoles.cache.has(roleId);

      if(hasRole) {
        memberRoles.remove(roleId);
       await  interaction.followUp(`${role.name} has been removed from user`)
       await wait(2000)
       await interaction.deleteReply()
      } else {
        memberRoles.add(roleId)
        await interaction.followUp(`Role has been added to the user`)
        await wait(2000)
        await interaction.deleteReply()
      }
    }
})