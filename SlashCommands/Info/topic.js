const { Client, EmbedBuilder } = require('discord.js')
const ec = require("../../settings/embed")

module.exports = {
    name: "topic",
    description: "💬 | Displays the channel topic",
    options: [{
        name: "channel",
        description: "Select a channel.",
        type: 7,
        required: true
    }, ],
    /**
     *  
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, args) => {
        const Target = interaction.options.getChannel('channel');
        const guild = interaction.guild;

        const channel = new EmbedBuilder()
            .setColor(ec.color)
            .setTitle(`**Channel Topic For ${guild.name}**`)
            .setURL(`https://discord.com/channels/${interaction.guildId}/${Target.id}`)
            .setDescription(
              `**Channel:** #${Target.name}\n`+
              `> ${Target.topic}`
            )
            .setFooter({ 
              text: `${interaction.guild.name}`, 
              iconURL: interaction.guild.iconURL({ dynamic: true }) })

        interaction.followUp({ embeds: [channel] })

    }
}