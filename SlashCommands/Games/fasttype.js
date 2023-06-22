const config = require("../../settings/disabled");
const { EmbedBuilder } = require('discord.js')
const type = require('../../structures/Json/fastType.json')
const { FastType } = require('discord-gamecord');

module.exports = {
  name: `fasttype`,
  description: `💻 | Play a game of fast type.`,

  run: async (client, interaction, options, cmd) => {
    if(!config.games.FastType) return interaction.followUp({ content : `${config.commandDisabledMessage}`, ephemeral: true})

    const Game = new FastType({
      message: interaction,
      isSlashGame: true,
      embed: {
          title: 'Fast Type',
          color: '#5865F2',
          description: 'You have {time} seconds to type the sentence below.\nAll sentence has a space as well.'
      },
      timeoutTime: 60000,
      sentence: `${type[Math.floor(Math.random() * type.length)]}`,
      winMessage: 'You won! You finished the type race in {time} seconds with wpm of {wpm}.',
      loseMessage: 'You lost! You didn\'t type the correct sentence in time.',
    });

    Game.startGame();
  },
};