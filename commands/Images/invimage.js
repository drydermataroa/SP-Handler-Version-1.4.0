const { Client, Message, EmbedBuilder } = require("discord.js")
const ec = require('../../settings/embed')

module.exports = {
    name: "invimage",
    description: "See the servers splash screen, aka the invite banner!",
    category: "Information",
    aliases: ["invitebanner",'ib',"inviteb"],
    emoji: "🎉",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const banner = message.guild.splashURL({dynamic: true, size: 1024})

        if(!banner) {
            return message.reply({content: `This server does not have a server invite image (invite banner)!`})
        }
        const embed = new EmbedBuilder()
        .setDescription(`**[16px](${message.guild.splashURL({dynamic: true, size: 16})})** • **[32px](${message.guild.splashURL({dynamic: true, size: 32})})** • **[64px](${message.guild.splashURL({dynamic: true, size: 64})})** • **[128px](${message.guild.splashURL({dynamic: true, size: 128})})** • **[256px](${message.guild.splashURL({dynamic: true, size: 256})})** • **[512px](${message.guild.splashURL({dynamic: true, size: 512})})** • **[1024px](${message.guild.splashURL({dynamic: true, size: 1024})})** • **[2048px](${message.guild.splashURL({dynamic: true, size: 2048})})** • **[4096px](${message.guild.splashURL({dynamic: true, size: 4096})})**`)
        .setImage(banner)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        .setColor(ec.color)

        return message.reply({embeds: [embed]})
    }
}