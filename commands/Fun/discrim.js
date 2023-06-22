const { Client, Message, EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed");


module.exports = {
    name: "discrim",
    description: "Shows a list of members with the same discriminator",
    category: "Utils",
    emoji: "🧭",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args.length) {
            return message.reply({content: `Please supply a valid discriminator!`})
        }
        if(!/^\d{4}$/.test(args.join(" "))) {
            return message.reply({content: `Please supply a valid discriminator!`})
        }

        let members = client.users.cache.filter(u => u.discriminator === args.join(" ")).map(user => user.tag)
        const total_members = members.length
        members = total_members > 20 ? members.slice(0, 20).join("\n") : members.join("\n")
        if(members.length <= 0) {
            members = "No members"
        }
        const embed = new EmbedBuilder()
        .setAuthor({ name: `Discriminators found!`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`there is a total of **${total_members}** member(s) with the discriminator **${args.join(" ")}**`)
        .addFields({name: "Users", value: `${total_members > 10 ? `${members} and ${total_members - 20} more.` : members}`})
        .setColor(ec.color)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })

        return message.reply({embeds: [embed]})

    }
}