const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const set = require("../../settings/settings")
const ec = require("../../settings/embed")

module.exports = {
	name: 'invite',
	description: "📩 | Get the bot's invite link",
    type: 1,

	run: async (client, interaction, args) => {
    
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`Invite the bot to your server. [Click here](${set.botInvite})`)
		.setColor(ec.color)
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({
			text: `Requested by: ${interaction.user.username}`,
			iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
		  })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(set.botInvite)
			.setStyle(5)
		])
		interaction.followUp({ embeds: [embed], components: [actionRow] })
	}
};