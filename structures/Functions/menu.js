const {
    StringSelectMenuBuilder,
    ActionRowBuilder
} = require(`discord.js`);

/* MENU CREATOR */
/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = (
    array
) => {

    if (!array) throw new Error(`The options were not provided! Make sure you provide all the options!`);
    if (array.length < 0) throw new Error(`The array has to have atleast one thing to select!`);
    let select_menu;

    let id = `help-menus`;

    let menus = [];

    const emo = {
      
        Fun: "🎮",
        General: "🎫",
        Images: "📸",
        Owner: "📝",
        Info: "❓",
        Moderator: "⚒️",
        Settings: "💰"
    }

    // now lets run it
    array.forEach(cca => {
        let name = cca;
        let sName = `${name.toUpperCase()}`
        let tName = name.toLowerCase();
        let fName = name.toUpperCase();

        return menus.push({
            label: sName,
            description: `${tName} commands!`,
            value: fName
        })
    });

    let chicken = new StringSelectMenuBuilder()
        .setCustomId(id)
        .setPlaceholder(`Choose the command category`)
        .addOptions(menus)

    select_menu = new ActionRowBuilder()
        .addComponents(
            chicken
        );


    return {
        smenu: [select_menu],
        sid: id
    }
}

module.exports = create_mh;