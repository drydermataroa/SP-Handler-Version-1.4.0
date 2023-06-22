const { EmbedBuilder } = require('discord.js');
const ec = require("../../settings/embed")
const superagent = require('superagent');

module.exports = {
  name: 'hug',
  description: '🥈 | Hug another usere.',
  type: 1,
  options: [
    {
      name: "user",
      description: "The user to hug",
      type: 6,
      required: true,
    }, 
  ],
    run: async (client, interaction, args) => {
//const user = interaction.guild.members.cache.get(args[0]) 
      const user = interaction.options.getUser("user")
        const { body } = await superagent
          .get("https://api.waifu.pics/sfw/hug");
              const embed = new EmbedBuilder()
          .setColor(ec.color)
          .setDescription(`${user} is hugged by ${interaction.member}`)
          .setImage(body.url)
          .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
          .setTimestamp()
      
       interaction.followUp( {embeds: [embed]});
        
    }
}