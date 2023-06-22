const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'dms',
    description: '📬 | Send embed message to dms',
    userPermissions: ['Administrator'],
    options: [
        {
            name: 'user',
            description: 'select a user',
            type: 6,
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
            description: 'input a message to send',
            type: 3,
            required: true,
        },
        {
            name: 'image',
            description: 'input a image URL',
            type: 3,
            required: false,
        },
    ],

    run: async(client, interaction, args) => {
        const target = interaction.options.getUser('user')
        const title = interaction.options.getString('title')
        const content = interaction.options.getString('message')
        const image = interaction.options.getString('image')

        const embed = new EmbedBuilder()
        .setTitle(`**${title}**`)
        .setColor('Random')
        .setDescription(`Hi ${target}\n${content}`)
        .setImage(image)
        .setTimestamp()

        target.send({ embeds: [embed] })

        interaction.followUp('Your message has been sent to the users dms..')
    }
}