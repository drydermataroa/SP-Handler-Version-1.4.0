const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed")

module.exports = {
  name: "clear",
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  type: 3,
  userPerms: ['Administrator'],
  emoji: "😅",
  run: async (client, message, args) => {

    if (!args[0])
      return message.channel.send(`Please Give Me Amounts Of Messages!`);

    if (isNaN(args[0]))
      return message.channel.send(`Please Give Me Number Value!`);

    if (args[0] < 4)
      return message.channel.send(
        `You Can Delete ${args[0]} By Your Self Its Not Too Many Messages!`
      );

    if (args[0] > 100)
      return message.channel.send(
        `I Can't Delete ${args[0]} Because Of Discord Limit!`
      );

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new EmbedBuilder()
        .setColor(ec.color)
        .setTitle(`**Messages Deleted**!`)
        .addFields(
            { name: `**Moderator Name:**`, value: `\`\`\`${message.author.tag}\`\`\``, inline: true },
            { name: `**Moderator ID:**`, value: `\`\`\`${message.author.id}\`\`\``, inline: true },
            { name: `**Channel:**`, value: `\`\`\`${message.channel.name}\`\`\``, inline: false },
            { name: `**Channel ID:**`, value: `\`\`\`${message.channel.id}\`\`\``, inline: true },
            { name: `**Deleted Messages:**`, value: `\`\`\`${Message.size}\`\`\``, inline: true },
            { name: `**Reason:**`, value: `\`\`\`${Reason}\`\`\``, inline: false },
            )
        .setFooter({ text: `Requested by ${message.author.username}`})
        .setTimestamp();

      return message.channel.send({ embeds: [embed]})
    })
                                             }
}