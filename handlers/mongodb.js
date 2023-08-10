const { Client } = require("discord.js");
const mongoose = require("mongoose");
const chalk = require('chalk')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const { mongooseConnectionString } = require('../settings/config.json')
    if (!mongooseConnectionString) return;

    mongoose.set('strictQuery', false)
    mongoose.connect(mongooseConnectionString)
      .then(() => console.log(chalk.magentaBright(`
╔═════════════════════════════════════════════╗
║                                             ║
║      MONGODB IS NOW CONNECTED....           ║
║                                             ║
╚═════════════════════════════════════════════╝`
                                         ))
            )
}
