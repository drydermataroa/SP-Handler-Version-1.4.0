const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { TicTacToe } = require('discord-gamecord');

module.exports = {
    name: `tictactoe`,
    description: `⚽ | Play a game of tictactoe.`,
    options: [
        {
            name: 'member',
            description: 'Select a user to play with.',
            type: 6,
            required: true,
        },
    ],
    
    run: async (client, interaction, options, cmd) => {
    const user = interaction.options.getUser('member')
    if(!config.games.TicTacToe) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
      opponent: user,
      embed: {
        title: 'Tic Tac Toe',
        color: '#5865F2',
        statusTitle: 'Status',
        overTitle: 'Game Over'
      },
      emojis: {
        xButton: '❌',
        oButton: '🔵',
        blankButton: '➖'
      },
      mentionUser: true,
      timeoutTime: 60000,
      xButtonStyle: 'DANGER',
      oButtonStyle: 'PRIMARY',
      turnMessage: '{emoji} | Its turn of player **{player}**.',
      winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
      tieMessage: 'The Game tied! No one won the Game!',
      timeoutMessage: 'The Game went unfinished! No one won the Game!',
      playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
    });
      
    Game.startGame();
  },
};