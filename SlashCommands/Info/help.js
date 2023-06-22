const { EmbedBuilder, ComponentType, SelectMenuBuilder, Client } = require("discord.js");
const ec = require("../../settings/embed");
const set = require("../../settings/settings")
const { readdirSync } = require("fs");

const create_mh = require(`../../structures/Functions/slashMenu`);

module.exports = {
    name: "help",
    description: "🏆 | Shows all available bot commands",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {

        const guild = interaction.guild;

        let categories = [];
        let cots = [];

        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "test"
            ];

            const emo = {

                Fun: "🎮",
                General: "🎫",
                Games: "🎲",
                Images: "📸",
                Owner: "📝",
                Settings: "⚙️",
                Info: "❓",
                Levels: "🏆",
                Moderator: "⚒️",
                Context: "💰"
// emojis for the categories
            }

            let ccate = [];
            //gets all the folders and commands
            readdirSync("./SlashCommands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`;
                //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
                let nome = dir.toUpperCase();

                let cats = new Object();

                //this is how it will be created as
                cats = {
                    name: name,
                    value: `\`/help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });
            //embed
            const embed = new EmbedBuilder()
                .setTitle(`__**Bot Commands**__`)
                .setDescription(`\`\`\` Powered By: ${guild.name} \`\`\` \n To check out a category, use dropdown menu below. Invite our into your server if you enjoy our commands.\n\n [🔴 Invite Me Now](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`)
                .addFields(categories)
                .setImage(ec.image)
                .setTimestamp()
                .setColor(ec.color)


//creating the dropdown menu
            let menus = create_mh(ccate);
            return interaction.followUp({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./SlashCommands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );


                        const cmds = commands.map((command) => {
                            let file = require(`../../SlashCommands/${dir}/${command}`); //getting the commands again

                            if (!file.name) return "No command name.";

                            let name = file.name.replace(".js", "");

                            if (client.slashCommands.get(name).hidden) return;


                            let des = client.slashCommands.get(name).description;
                            let emo = client.slashCommands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : `No Description`,
                                inline: true,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new EmbedBuilder()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Use \`/help\`to get more information on a command.\n\n`)
                            .addFields(catts)
                            .setColor(ec.color)
                            .setImage(ec.image)

                        await interaction.deferUpdate();

                        return interaction.message.edit({
                            embeds: [combed],
                            components: menus.smenu
                        })
                    };

                };

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == interaction.user.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: ComponentType.SelectMenu
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        } else {
            let catts = [];

            readdirSync("./SlashCommands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../SlashCommands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    if (client.commands.get(name).hidden) return;


                    let des = client.slashCommands.get(name).description;
                    let emo = client.slashCommands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.slashCommands.get(args[0].toLowerCase()) ||
                client.slashCommands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new EmbedBuilder()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`/help\`to get more information on a command.\n\n`)
                    .addFields({ name: catts})
                    .setColor(ec.color)
                    .setImage(ec.image)

                return interaction.followUp({
                    embeds: [combed]
                })
            };

            if (!command) {
                const embed = new EmbedBuilder()
                    .setTitle(`Invalid command! Use \`/help\` for all of my commands!`)
                    .setColor(ec.color);
                return await interaction.followUp({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }

            const embed = new EmbedBuilder()
                .setTitle("Command Details:")
                .addField(
                   "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                  )
                .addField(
                  "Aliases:",
                   command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                  )
                .addField(
                   "Usage:",
                   command.usage ?
                    `\`/${command.name} ${command.usage}\`` :
                    `\`/${command.name}\``
                  )
                .addField(
                   "Command Description:",
                   command.description ?
                    command.description :
                    "No description for this command."
                  )
             /*   .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )*/
                .setTimestamp()
                .setColor(ec.color);
            return await interaction.followUp({
                embeds: [embed]
            });
        }
    },
}; 