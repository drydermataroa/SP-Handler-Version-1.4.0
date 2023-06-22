const { Client, Message, EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed")

module.exports = {
    name: "reverse",
    description: "reverse your text!",
    category: "Fun",
    emoji: "⚒️",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args.length) return message.reply({content: ` Please supply some text!`})

        const word = new EmbedBuilder()
        .setTitle("**Reversed Word**")
        .setColor(ec.color)
        .setDescription(`${args.join(" ").split("").reverse().join("")}`)
        .setTimestamp()

        message.reply({embeds: [word]})
    }
}