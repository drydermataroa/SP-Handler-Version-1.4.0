const { Client, Message, EmbedBuilder, Embed } = require("discord.js")
const ec = require("../../settings/embed")
const set = require("../../settings/settings")

module.exports = {
    name: "commandcount",
    description: "See total prefix command in this handler.",
    category: "Info",
    emoji: "⌛",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let total = 0
        client.commands.each((c) => total++)

        const count = new EmbedBuilder()
        .setTitle('Prefix Command Count')
        .setColor(ec.color)
        .setDescription(`Here are the total prefix commands for **SP Handler Version ${set.handlerVersion}**.`)
        .addFields(
            { name: '**Total Prefix Commands:**', value: `\`\`\`${total}\`\`\``, inline: true },
            )
        .setFooter({ text: `Requested by: ${message.author.tag}`})
        .setTimestamp()

        message.reply({ embeds: [count]})
    }
}