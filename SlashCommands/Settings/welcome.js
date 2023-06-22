const Schema = require('../../structures/Models/welcomeChannel');

module.exports = {
  name: 'setup-welcome',
  description: "🔰 | This sets a welcome channel in the server.",
  userPermissions: ['Administrator'],
  options: [
    {
      name: 'channel',
      description: 'Select a channel for welcome system',
      type: 7,
      required: true,
    },
  ],
  
  run: async(client, interaction, args ) => {
    const channel = interaction.options.getChannel('channel')
      
    Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
      
      if(data) {
        data.Channel = channel.id;
        data.save()
      } else {
        new Schema({
          Guild: interaction.guild.id,
          Channel: channel.id,
        }).save()
      }
      
      interaction.followUp(`${channel} Has Been Set As Welcome Channel!`)
    })
  }
}