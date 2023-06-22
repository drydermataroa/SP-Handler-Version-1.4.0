const { Client, Message, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const set = require('../../settings/settings')
const ec = require('../../settings/embed')

module.exports = {
    name: "links",
    description: "See all of lotas links",
    emoji: "🔗",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Links!`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`All useful links can be found below!`)
        .setColor(ec.color)

        const row = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder() .setURL(set.botInvite) .setLabel("Invite") .setStyle(ButtonStyle.Link),
            new ButtonBuilder() .setURL(set.guildInvite) .setLabel("Support") .setStyle(ButtonStyle.Link)
        ])

        message.reply({embeds: [embed], components: [row]})
    }
}