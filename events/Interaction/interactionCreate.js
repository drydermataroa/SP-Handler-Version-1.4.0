const client = require("../../index");
const { EmbedBuilder } = require("discord.js")
const { ownerId } = require("../../settings/settings");
const embed = require("../../settings/embed")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

      /// owner only handler
      if (cmd) {
      if (cmd.ownerOnly) {
      if (!ownerId.includes(interaction.user.id)) {
      let ownerOnly = new EmbedBuilder() 
        .setTitle("__**Owner Only**__")
        .setImage(embed.image)
        .setColor(embed.wrong)
        .setDescription("Only Bot Developer can use this command!")
        .setTimestamp()
        return interaction.followUp({embeds : [ownerOnly] })
     }}
    }

     // userPermission Handler
        if(!interaction.member.permissions.has(cmd.userPermissions || [])) 
        return interaction.followUp({ 
          embeds: [
            new EmbedBuilder()
            .setTitle("__**WARNING PERMISSIONS**__")
            .setColor(embed.wrong)
            .setImage(embed.image)
            .setDescription(`You do not have **${cmd.userPermissions}** to run this command`)
            .setTimestamp()
          ]
        });

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
  });