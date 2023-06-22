const { Message, Client } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: "stickerinfo",
    description: 'check any stckers for its info',
    emoji: "🧲",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const sticker = message.stickers.first();
        if (!sticker) return message.reply({ content: '**Please specify a sticker!**' });
        let { EmbedBuilder } = require("discord.js");
        
        let stickerID = message.stickers.first().id;
        let stickeName = message.stickers.first().name;
        // let uploader = sticker.fetchUser();

        let embed = new EmbedBuilder()
            .setAuthor({ name: `Sticker Info`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(`${sticker.url}`, { dynamic: true })
            .setColor(ec.color)
            .setFooter({ text: `Checker: ${message.author.tag}` })
            .setTimestamp()
            .addFields(
                {
                    name: "__Name:__",
                    value: `\`\`\`\n${stickeName}\n\`\`\``,
                    inline: true
                },
                {
                    name: "__ID:__",
                    value: `\`\`\`\n${stickerID}\n\`\`\``,
                    inline: true
                },
                {
                    name: "__Created At:__",
                    value: `\`\`\`\n${sticker.createdAt}\n\`\`\``,
                    inline: false
                },
                {
                    name: "__URL:__",
                    value: `[Click Here](${sticker.url})`,
                    inline: true
                },
                {
                    name: "__Format:__",
                    value: `\`\`\`\n${sticker.format}\n\`\`\``,
                    inline: true
                },
                
            )
        message.channel.send({ embeds: [embed] });
    },
};