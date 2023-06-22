const { ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'setup-reports',
    description: '📊 | Setup reports system in the server.',
    userPermissions: ['Administrator'],

    run: async(client, interaction, args) => {
        
        const reportschannel = interaction.guild.channels.cache.find(channel => channel.name == "reports");

        const setupembed = new EmbedBuilder()
            .setTitle("Setup has been completed.")
            .setDescription("If you don't see a new channel, check browse channels feature.")
            .setColor("Green")

        const alredyembed = new EmbedBuilder()
            .setTitle("Setup has been alredy completed.")
            .setDescription("If you don't see a channels reports, check browse channels feature.")
            .setColor("Yellow")

        if ((reportschannel)) {
            interaction.followUp({ embeds: [alredyembed], ephemeral: true });
            return
        }

        if (!reportschannel) {
            interaction.guild.channels.create({
                name: "reports",
                type: ChannelType.GuildText,
            })
        }

        await interaction.followUp({ embeds: [setupembed], ephemeral: true });
    },
};