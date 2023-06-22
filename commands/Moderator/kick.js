const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: ['kick'],
    usage: ["<user>"],
    description: "This command kick a member!",
    userPerms: ['Administrator'],
    emoji: "🔨",
    run(client, message, args){

        const target = message.mentions.users.first();
        if(!target) return message.reply({ content: "Who are you trying to kick?" })
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            message.delete();
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("2")
                .setLabel("Approve kick")
                .setStyle(ButtonStyle.Success)
                .setEmoji("✅"),
                new ButtonBuilder()
                .setCustomId("1")
                .setEmoji("🚫")
                .setLabel("Dissallow kick")
                .setStyle(ButtonStyle.Danger),
            )
            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("1")
                .setEmoji("🚫")
                .setLabel("Dissallow kick")
                .setDisabled(true)
                .setStyle(ButtonStyle.Danger)
            )
            const filter1 = i => i.customId === "2" && i.user.id;

            const collector = message.channel.createMessageComponentCollector({ filter1 });

            collector.on('collect', async i => {
                if (i.customId === "2") {
                    i.update({ content: "**Member kicked**", components: [] })
                    memberTarget.kick();
                }
            })
            const filter2 = b => b.customId === "1" && i.user.id;

            const collectorr = message.channel.createMessageComponentCollector({ filter2 });
            
            collectorr.on('collect', async b => {
                if (b.customId === "1") {
                    b.update({ content: "**Member not kicked**", components: [row2] })
                }
            })
            message.channel.send({ content: "**kick command**", components: [row] })
        }
        }
    }