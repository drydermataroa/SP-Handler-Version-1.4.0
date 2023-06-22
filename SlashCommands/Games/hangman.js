const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { Hangman } = require('discord-gamecord');

module.exports = {
  name: `hangman`,
  description: `🧍 | Play a game of hangman.`,

  run: async (client, interaction, options, cmd) => {
    if(!config.games.Hangman) return interaction.followUp({ 
      content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new Hangman({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Hangman',
        color: '#5865F2'
      },
      hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
      customWord: undefined,
      timeoutTime: 60000,
      theme: 'nature',
      winMessage: 'You won! The word was **{word}**.',
      loseMessage: 'You lost! The word was **{word}**.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
    Game.startGame();
  },
};