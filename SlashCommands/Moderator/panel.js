const { ChatInputCommandInteraction, Client, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ApplicationCommandOptionType } = require("discord.js");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "role-panel",
    description: "📊 | Setup your dropdown role system",
    userPermissions: ['Administrator'],
    options: [
        {
            name: "description",
            description: "Provide a description for the dropdown menu",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "roles",
            description: "Add your roles by doing @Role (Ping As Much Roles You Want)",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    run: async(client, interaction) => {
        const roleIds = interaction.options.getString("roles").match(/<@&(\d{17,19})>/g) || [];
        const description = interaction.options.getString("description");
        const embed = new EmbedBuilder();
        let rolesList = [];

        if (!roleIds.length) {
            embed
                .setColor(ec.wrong)
                .setDescription(`You haven't provided valid roles`);
            return interaction.followUp({ embeds: [embed], ephemeral: true });
        }

        let invalidRoles = [];
        
        for (let i = 0; i < roleIds?.length; i++) {
            const id = roleIds[i].slice(3, -1);
            const role = await interaction.guild.roles.cache.get(id);
            if (role.managed) invalidRoles.push(role);
            rolesList.push({ label: role.name, value: role.id, description: `Select the ${role.name} role` });
        }

        if (invalidRoles.length) {
            embed
                .setColor(ec.wrong)
                .setDescription(`You have provided invalid roles: ${invalidRoles.map((r) => r).join(", ")}`);
            return interaction.followUp({ embeds: [embed] });
        }

        const mainEmbed = new EmbedBuilder()
            .setTitle(`${emojis.book} Reaction Roles ${emojis.book}`)
            .setColor(ec.color)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setDescription(description.substring(0, 4096));

        const rolesMenu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("role-menu")
                .setPlaceholder("Select a role!")
                .addOptions(rolesList)
        );

        await interaction.channel.send({ embeds: [mainEmbed], components: [rolesMenu] }).then(() => {
            embed
                .setColor(ec.color)
                .setDescription(`Dropdown menu has been created`)
            return interaction.followUp({ embeds: [embed], ephemeral: true })
        }).catch(() => {
            embed
                .setColor(ec.wrong)
                .setDescription(`There was an error while trying to setup the dropdown role system`);
            return interaction.followUp({ embeds: [embed], ephemeral: true })
        });
    },
};