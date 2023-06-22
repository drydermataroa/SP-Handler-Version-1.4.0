const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    name: `rps`,
    description: `✂️ | Play a game of rock paper scissors.`,
    options: [
        {
            name: 'member',
            description: 'Select a user to play with',
            type: 6,
            required: true,
        },
    ],
    
    run: async (client, interaction, options, cmd) => {
    const user = interaction.options.getUser('member')
    if(!config.games.RockPaperScissors) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new RockPaperScissors({
      message: interaction,
      isSlashGame: true,
      opponent: user,
      embed: {
        title: 'Rock Paper Scissors',
        color: '#5865F2',
        description: 'Press a button below to make a choice.'
      },
      buttons: {
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors'
      },
      emojis: {
        rock: '🌑',
        paper: '📰',
        scissors: '✂️'
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      pickMessage: 'You chose {emoji}.',
      winMessage: '**{player}** won the Game! Congratulations!',
      tieMessage: 'The Game tied! No one won the Game!',
      timeoutMessage: 'The Game went unfinished! No one won the Game!',
      playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
    });
      
    Game.startGame();
  },
};