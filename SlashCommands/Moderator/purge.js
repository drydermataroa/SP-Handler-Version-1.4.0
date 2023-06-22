const { EmbedBuilder } = require('discord.js');
const ec = require("../../settings/embed");

module.exports = {
    name: 'clear',
    description: '❌ | Deletes max amount of messages 99.',
    category: 'Moderator',
    userPermissions: ['Administrator'],
    type: 1,
    options: [
        {
            name: 'number_of_messages',
            type: 3,
            description: 'Number of messages to delete (2-99)',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
      
        let amount = args[0]
        if (amount <= 100) {
            interaction.channel.bulkDelete(amount, true)
        }

      const clear = new EmbedBuilder()
      .setTitle("🗑️ | **REMOVED UNWANTED MESSAGES** | 🗑️")
      .setColor(ec.color)
      .setDescription(`⚠️ I've cleared \`${amount}\` messages 🗑️`)
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()

      interaction.channel.send({ embeds: [clear]})
    }
}