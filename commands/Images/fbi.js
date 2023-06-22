const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed")

module.exports = {
    name: 'fbi',
    description: 'Get FBI Gifs',
    emoji: '🚨',

    run: async(client, message, args) => {

        let name = args.slice(0).join(' ');

        const embed = new EmbedBuilder()
        .setColor(ec.color)
        .setDescription(`**${name}` + message.author.username + '** FBI Open the door !')
        .setImage(`https://media1.tenor.com/images/93d11bc59526ce49f60766f0045d819b/tenor.gif?itemid=11500735`)
        .setFooter({ text: "Request by "+ message.author.tag, iconURL: message.author.displayAvatarURL() })
        .setTimestamp()

        return message.channel.send({ embeds: [embed]});
    }
}