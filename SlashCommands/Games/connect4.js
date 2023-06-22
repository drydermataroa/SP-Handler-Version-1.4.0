const config = require("../../settings/disabled");
const { CommandInteraction, Client } = require("discord.js");
const { Connect4 } = require("discord-gamecord");

module.exports = {
  name: "connect4",
  description: "🎯 | Play connect 4 in discord!",
  options: [
    {
      name: "user",
      description: "Mention someone to play with",
      type: 6,
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction, options, cmd) => {
    const user = interaction.options.getUser('user')
    if(!config.games.Connect4) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new Connect4({
      message: interaction,
      isSlashGame: true,
      opponent: user,
      embed: {
        title: 'Connect4 Game',
        statusTitle: 'Status',
        color: '#5865F2'
      },
      emojis: {
        board: '⚪',
        player1: '🔴',
        player2: '🟡'
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      turnMessage: '{emoji} | Its turn of player **{player}**.',
      winMessage: '{emoji} | **{player}** won the Connect4 Game.',
      tieMessage: 'The Game tied! No one won the Game!',
      timeoutMessage: 'The Game went unfinished! No one won the Game!',
      playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
    });
      
    Game.startGame();
  },
};