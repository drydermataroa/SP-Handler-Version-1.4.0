const { EmbedBuilder } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
    name: 'cleverate',
    description: '⌛ | Rate a user on how clever are they.',
    category: 'Fun',
    type: 1,
    options: [
        {
            type: 6,
            description: 'select the users name.',
            name: 'user',
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let rng = Math.floor(Math.random() * 101);

        const cleverembed = new EmbedBuilder()
            .setTitle("__**CLEVER Rate**__ 💡")
            .setDescription(`**__${member.user.username}#${member.user.discriminator}__** ===> ` + rng + "% Clever!!`**")
            .setColor(ec.color)
            .setThumbnail('https://www.poetry4kids.com/wp-content/uploads/2008/05/im-clever-whenever.png')
            .setTimestamp()
            .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }), })
      

        interaction.followUp({ embeds: [cleverembed] });
    }
}