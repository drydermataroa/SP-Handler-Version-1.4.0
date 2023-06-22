const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { Slots } = require('discord-gamecord');

module.exports = {
  name: `slots`,
  description: `🎰 | Play a game of slots`,

  run: async (client, interaction) => {
    if(!config.games.Slots) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new Slots({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Slot Machine',
        color: '#5865F2'
      },
      slots: ['🍇', '🍊', '🍋', '🍌']
    });
      
    Game.startGame();
  },
};