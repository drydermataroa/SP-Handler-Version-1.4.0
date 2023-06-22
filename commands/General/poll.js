const { EmbedBuilder } = require('discord.js')
const ec = require('../../settings/embed')

module.exports = {
    name: "poll",
    userPerms: ["Administrator"],
    description: "Set up a poll in the server",
    emoji: "📩",

    run: async(client, message, args) => {

        const channel = message.mentions.channels.first();
        const pollMessage = args.slice(1).join(' ');

        if(!channel) return message.channel.send("Please mention a channel name and then the description")
        if(!pollMessage) return message.channel.send("Please mention a channel name and then the description")

        const embed = new EmbedBuilder()
        .setTitle(`${client.user.username} Poll`)
        .setDescription(pollMessage)
        .setColor(ec.color)
        .setTimestamp()
        const msgEmbed = await channel.send({embeds: [embed]});
        await msgEmbed.react('✅')
        await msgEmbed.react('❎')
    
    }
}