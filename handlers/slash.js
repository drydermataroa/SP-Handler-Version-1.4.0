const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const chalk = require('chalk')

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    console.log((chalk.yellowBright`
╔═════════════════════════════════════════════╗
║                                             ║
║      SLASH COMMAND HANDLER CONNECTED....    ║
║                                             ║
╚═════════════════════════════════════════════╝`
    ))
    
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );
    
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {

         await client.application.commands.set(arrayOfSlashCommands);
    });
};