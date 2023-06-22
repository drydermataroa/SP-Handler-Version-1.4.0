const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const chalk = require('chalk')

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    console.log(chalk.blueBright(`
╔═════════════════════════════════════════════╗
║                                             ║
║        PREFIX HANDLER CONNECTED....         ║
║                                             ║
╚═════════════════════════════════════════════╝`
    ))

    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];
        
        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
};