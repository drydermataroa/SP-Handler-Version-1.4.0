const { EmbedBuilder } = require('discord.js')
const ec = require('../../settings/embed')

module.exports = {
    name: 'Fetch user ID',
	type: 2,
	emoji: "🪓",
	run: async(client, interaction) => {
		let user = await client.users.fetch(interaction.targetId)
		const embed = new EmbedBuilder()
        .setColor(ec.color)
        .setDescription(`${user.username}'s user ID: \`${user.id}\``)
        
        interaction.followUp({ embeds: [embed], ephemeral: false })
	},
}