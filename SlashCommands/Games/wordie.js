const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { Wordle } = require('discord-gamecord');

module.exports = {
    name: `wordle`,
    description: `📊 | Play a game of wordle.`,
    
    run: async (client, interaction) => {
    if(!config.games.Wordle) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new Wordle({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Wordle',
        color: '#5865F2',
      },
      customWord: null,
      timeoutTime: 60000,
      winMessage: 'You won! The word was **{word}**.',
      loseMessage: 'You lost! The word was **{word}**.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
    Game.startGame();
  },
};