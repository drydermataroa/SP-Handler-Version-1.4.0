const { Client, Message } = require("discord.js")
const emojis = require('../../settings/emojis')

module.exports = {
    name: "changename",
    description: "Change the bots name",
    userPerms: ['Administrator'],
    emoji: "🤖",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args.join(" ")) {
            return message.reply({content: `${emojis.error} • Please supply a new name!`})
        }
        if(!args.length >= 32) {
            return message.reply({content: `${emojis.error} • Name must be below 32 charaters!`})
        }
       client.user.setUsername(args.join(" ")) 
    }
}