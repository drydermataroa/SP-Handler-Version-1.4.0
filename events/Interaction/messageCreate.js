const client = require("../../index");
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { prefix } = require("../../settings/config.json")
const ec = require("../../settings/embed")

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if(command.userPerms) {
        if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
            const userPerms = new EmbedBuilder()
            .setTitle('**Permission Needed**')
            .setColor(ec.wrong)
            .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
            return message.reply({ embeds: [userPerms] })
        }
    }

    await command.run(client, message, args);
});