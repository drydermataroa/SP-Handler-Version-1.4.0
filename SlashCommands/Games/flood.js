const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const { Flood } = require('discord-gamecord');

module.exports = {
    name: `flood`,
    description: `🎯 | Play a game of flood colors.`,
    type: 1,
    options: [
        {
            name: 'mode',
            description: 'Input number: 8 for easy/ 13 for medium/ 18 for hard mode',
            type: 10,
            required: true,
            choices: [
              {
                name: 'Easy',
                value: '8',
              },
              {
                name: 'Medium',
                value: '13',
              },
              {
                name: 'Hard',
                value: '18',
              },
            ],
        },
    ],
    
    run: async (client, interaction, options, cmd) => {
    const floodType = interaction.options.getNumber('mode')
    if(!config.games.Flood) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})
    
    const Game = new Flood({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Flood',
        color: '#5865F2',
      },
      difficulty: floodType,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
      winMessage: 'You won! You took **{turns}** turns.',
      loseMessage: 'You lost! You took **{turns}** turns.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
    Game.startGame();
  },
};