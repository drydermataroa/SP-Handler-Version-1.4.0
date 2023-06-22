const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const set = require("../../settings/settings")
const ec = require("../../settings/embed")

module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	emoji: "🔗",
	
	run: async (client, message, args) => {
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${set.client_id}&permissions=8&scope=bot%20applications.commands`;
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`Invite the bot to your server. [Click here](${inviteUrl})`)
		.setColor(ec.color)
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(set.supportInvite)
			.setStyle(5)
		])
		message.reply({ embeds: [embed], components: [actionRow] })
	}
};