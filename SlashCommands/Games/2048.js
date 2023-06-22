const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { TwoZeroFourEight } = require('discord-gamecord');

module.exports = {
    name: '2048',
    description: `🎲 | Play a game of 2048.`,
    
    run: async (client, interaction, options, cmd) => {
    if(!config.games[2048]) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new TwoZeroFourEight({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: '2048',
        color: '#5865F2'
      },
      emojis: {
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
    Game.startGame();
  },
};