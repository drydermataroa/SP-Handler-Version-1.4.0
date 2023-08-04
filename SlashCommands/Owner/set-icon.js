const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');
const ec = require('../../settings/embed')

module.exports = {
    name: 'set-icon',
    description: '📊 | Change the icon in the current server',
    ownerOnly: true,
    options: [
        {
            name: 'icon',
            description: 'The icon to set',
            type:3,
            required:true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        
        const icon = interaction.options.getString('icon')
        interaction.guild.setIcon(icon);
        
        const newicon = new EmbedBuilder()
        .setTitle('Icon Changed')
        .setImage(icon)
        .setColor(ec.color)
        .setTimestamp()
        
        return interaction.followUp({embeds:[newicon]})
    }
}