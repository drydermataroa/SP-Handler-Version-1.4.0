const { EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed")

module.exports = {
    name: 'emojis',
    description: '🌏 | Get a list of emojis in the server.',
    category: 'general',
  
    run: async (client, interaction, args) => {
        const emojis = interaction.guild.emojis.cache.map((r) => r).join(' ');
        const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setTitle(
            `${interaction.guild.emojis.cache.filter((r) => r.animated === false).size} Emotes, ${
                interaction.guild.emojis.cache.filter((r) => r.animated).size
            } Animated (${interaction.guild.emojis.cache.size} Total)`,
            )
        .setDescription(emojis.toString())
        .setColor(ec.color)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
        
        return interaction.followUp({ embeds: [embed] });
    },
};