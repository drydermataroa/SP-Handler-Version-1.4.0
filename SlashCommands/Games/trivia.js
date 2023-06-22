const { Trivia } = require('discord-gamecord');
const { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "trivia",
  description: "🧸 | Play trivia in discord!",
  type: 1,
  options: [
    {
      name: 'mode',
      description: 'select the game difficulty.',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Easy',
          value: 'easy',
        },
        {
          name: 'Medium',
          value: 'medium',
        },
        {
          name: 'Hard',
          value: 'hard',
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const trivieMode = interaction.options.getString('mode')
    new Trivia({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Trivia',
        color: '#5865F2',
        description: 'You have 60 seconds to guess the answer.'
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      trueButtonStyle: 'SUCCESS',
      falseButtonStyle: 'DANGER',
      mode: 'multiple',  // multiple || single
      difficulty: trivieMode,  // easy || medium || hard
      winMessage: 'You won! The correct answer is {answer}.',
      loseMessage: 'You lost! The correct answer is {answer}.',
      errMessage: 'Unable to fetch question data! Please try again.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    }).startGame();
  },
};