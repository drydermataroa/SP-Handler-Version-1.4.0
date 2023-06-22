const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const chalk = require('chalk')

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    console.log(chalk.magentaBright(`
╔═════════════════════════════════════════════╗
║                                             ║
║         EVENT HANDLER CONNECTED....         ║
║                                             ║
╚═════════════════════════════════════════════╝`
    ))

    const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventFiles.map((value) => require(value));
};