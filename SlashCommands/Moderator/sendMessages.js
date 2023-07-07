const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const ec = require('../../settings/embed')

module.exports = {
    name: 'sendmessage',
    description: '📩 | send message with button to channel',
    options: [
        {
            name: 'channel',
            description: 'select a channel',
            type: 7,
            required: true,
        },
        {
            name: 'title',
            description: 'input a title',
            type: 3,
            required: true,
        },
        {
            name: 'message',
            description: 'input main message',
            type: 3,
            required: true,
        },
        {
            name: 'link',
            description: 'input anu link',
            type: 3,
            required: true,
        },
        {
            name: 'image',
            description: 'input image url',
            type: 3,
            required: false,
        },
    ],

    run: async(client, interaction, args) => {
        const mainChannel = interaction.options.getChannel('channel')
        const title = interaction.options.getString('title')
        const content = interaction.options.getString('message')
        const url = interaction.options.getString('link')
        const image = interaction.options.getString('image')

        const embed = new EmbedBuilder()
        .setTitle(`**${title}**`)
        .setColor(ec.color)
        .setDescription(`${content}`)
        .setImage(image)
        .setTimestamp()

        const row = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
            .setLabel('Select Button')
            .setURL(`${url}`)
            .setStyle(ButtonStyle.Link)
        ])

        mainChannel.send({ embeds: [embed], components: [row] })

        interaction.followUp(`Your message has been sent to ${mainChannel}`)
    }
}