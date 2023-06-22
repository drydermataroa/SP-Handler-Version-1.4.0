const { EmbedBuilder } = require('discord.js')
const ec = require('../../settings/embed')
const fetch = require("node-fetch")

module.exports = {
    name: 'deepfry',
    description: 'Deepfry a user',
    emoji: '🧸',

    run: async(client, message, args) => {
        const user = message.mentions.members.first() || message.member || message.guild.users.cache.get(u => u.id === args[0])
        const avatar = user.user.displayAvatarURL({ dynamic: false, size: 4096})
        fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`)
        .then((res) =>  res.json())
        .then((data) => {
            const embed = new EmbedBuilder()
            .setTitle("**Deepfried!**")
            .setImage(data.message)
            .setColor(ec.color)
            .setTimestamp()
            
            message.channel.send({embeds: [embed]})
        })
    }
}