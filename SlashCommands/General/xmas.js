const { EmbedBuilder } = require("discord.js")
const ec = require('../../settings/embed')

module.exports = {
    name: 'xmas-day',
    description: '🎄 | Check when is Christmas.',

    run: async(client, interaction, args) => {
        let today = new Date();
        let xmas = new Date(today.getFullYear(), 11, 24);
        if (today.getMonth() == 11 && today.getDate() > 24) {
            xmas.setFullYear(xmas.getFullYear() + 1);
        }
        let one_day = 1000 * 60 * 60 * 24;
        let daysleft = Math.ceil((xmas.getTime() - today.getTime()) / (one_day));
        let days = daysleft + 1

        const embed = new EmbedBuilder()
        .setThumbnail('https://i.imgur.com/4E5kAbQ.gif')
        .setTitle('☃️ Christmas Day ☃️')
        .setColor(ec.color)
        .setDescription(`Celebrate Christmas With Family & Friends...`)
        .setFooter({
            text: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
        .addFields(
            { name: '**Christmas Day:**', value: `\`\`\`${days}\`\`\``, inline: true },
            )
        .setTimestamp()

        return interaction.followUp({ embeds: [embed] })
    }
}