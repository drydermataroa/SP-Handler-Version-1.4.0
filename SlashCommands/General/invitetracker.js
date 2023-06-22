const { Client, EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: 'invitetracker',
    description: '⌛ | Gets the number of invites from users that joined your server.',
    type: 1,
    options: [
        {
            name: 'user',
            type: 6,
            description: 'tag to see their invs',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id)

        if (userInv.size <= 0) {
            return interaction.followUp({ content: `${user} has \`0\` invites ` })
        }

        let invCodes = userInv.map(x => x.code).join('\n')
        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const tackerEmbed = new EmbedBuilder()
            .setDescription(`**Invites  of:** ${user} `)
            .addFields(
              { name: `User Invites`, value: `${i}`, inline: true },
              { name: `Invite Codes:`, value: `${invCodes}`, inline: true }
            )
            .setColor(ec.color)
            .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })      
          .setTimestamp()

        interaction.followUp({ embeds: [tackerEmbed] });
    }
}