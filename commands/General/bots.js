const { Client, Message, EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
    name: "bots",
    description: "See all bots in the server!",
    category: "Information",
    emoji: "🤖",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let members = message.guild.members.cache.filter(u => u.user.bot).map((u) => `${u.user.tag} (\`${u.id}\`)`)
        const total_members = members.length
        members = total_members > 20 ? members.slice(0, 20).join("\n") : members.join("\n")
        if(members.length <= 0) {
            members = "No Bots"
        }

        const embed = new EmbedBuilder()
        .setAuthor({ name: `Bots found!`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`There is a total of **${total_members}** bots in **${message.guild.name}**`)
        .addFields(
            {name: "__**Discord Bots**__", value: `${total_members > 20 ? `${members} and ${total_members - 20} more.` : members}`})
        .setColor(ec.color)
        .setFooter({ text: ` • Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })

        return message.reply({embeds: [embed]})
    }
}