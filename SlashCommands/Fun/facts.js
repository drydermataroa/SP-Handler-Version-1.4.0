const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const ec = require('../../settings/embed')

module.exports = {
  name: 'fact',
  description: '📊 | Sends a random useless fact.',
  category: 'Fun',
 
  run: async(client, interaction, args) => {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    await response.json().then(res => {
      interaction.followUp({
        embeds: [new EmbedBuilder()
            .setTitle('Random Facts')
            .setDescription(res.text)
            .setFooter({ text: '**Powered By:** Useless Facts API' })
            .setColor(ec.color)]
      });
    });
  }
};