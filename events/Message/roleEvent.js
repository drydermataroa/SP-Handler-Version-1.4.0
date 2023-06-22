const client = require('../../index')
const { Client, EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");
const ec = require('../../settings/embed')

client.on("interactionCreate", async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;
        if (interaction.customId !== "role-menu") return;
        const embed = new EmbedBuilder();

        const roleToGive = interaction.values[0];
        const roleFetched = await interaction.guild.roles.fetch(roleToGive);
        if (!roleFetched) {
            embed
                .setColor(ec.wrong)
                .setDescription(`This role doesn't exist`);
            return interaction.followUp({ embeds: [embed], ephemeral: true });
        }

        if (roleFetched.managed || !roleFetched.editable) {
            embed
                .setColor(ec.wrong)
                .setDescription(`I cannot give this role to you`);
            return interaction.followUp({ embeds: [embed], ephemeral: true });
        }

        const hasRole = interaction.member.roles.cache.has(roleToGive);

        embed
            .setColor(ec.color)
            .setDescription(`${hasRole ? "Removed" : "Added"} the ${roleFetched} role ${hasRole ? "from" : "to"} you`);

        const errorEmbed = new EmbedBuilder()
            .setColor(ec.wrong)
            .setDescription(`I do not have permission to ${hasRole ? "remove" : "add"} that role ${hasRole ? "from" : "to"} you`);

        if (hasRole) {
            return interaction.member.roles.remove(roleFetched)
                .then(() => interaction.reply({ embeds: [embed], ephemeral: true }))
                .catch(() => interaction.followUp({ embeds: [errorEmbed], ephemeral: true }));
        } else {
            return interaction.member.roles.add(roleFetched)
                .then(() => interaction.reply({ embeds: [embed], ephemeral: true }))
                .catch(() => interaction.followUp({ embeds: [errorEmbed], ephemeral: true }));
        }
    })