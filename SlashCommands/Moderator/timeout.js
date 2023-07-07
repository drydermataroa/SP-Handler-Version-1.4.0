const { EmbedBuilder } = require("discord.js");
const ec = require("../../settings/embed");
const ms = require("ms");

module.exports = {
    name: 'timeout',
    description: '⏰ | Timeout a user in the server',
    category: 'Moderator',
    userPermissions: ['Administrator'],
    type: 1,
    options: [{
        name: "mute",
        description: "Timeout A User",
        type: 1,
        options: [{
            name: "user",
            description: "Provide A User To The Timeout.",
            type: 6,
            required: true
        },
        {
            name: "length",
            description: "Provide Length For Timeout... [ 1 Second Up To 28 Days ]  ",
            type: 3,
            required: true
        },
        {
            name: "reason",
            description: "Provide A Reason For The Timeout",
            type: 3,
            required: false
        }]
    },
        {
            name: "unmute",
            description: "Untimeout A User",
            type: 1,
            options: [{
                name: "user",
                description: "Provide A User To Untimeout.",
                type: 6,
                required: true
            },
            {
                name: "reason",
                description: "Provide A Reason For The Untimeout",
                type: 3,
                required: false
            }
            ]
        }
    ],

     run: async (client, interaction, args) => {

        const options = interaction.options
        const target = options.getMember("user");
        const length = options.getString("length");
        const reason = options.getString("reason") || "No Reason Provided";
        const maxtime = ms("28d")
        if(length) timeInMs = ms(length);

        try {
            switch (options.getSubcommand()) {
                case "mute": {
                    if (target.id === interaction.member.id)
                    return interaction.followUp({
                        embeds: [new EmbedBuilder().setTitle("❌ Error ❌").setColor(ec.color)
                            .setDescription(`Hey... ${interaction.user.username} Why Are You Trying To Timeout Yourself....?`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if(!timeInMs)
                        return interaction.followUp({
                        embeds: [new EmbedBuilder().setTitle("❌ Error ❌").setColor(ec.color)
                            .setDescription("Please Specify A Valid Time!").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (timeInMs > maxtime )
                        return interaction.followUp({
                        embeds: [new EmbedBuilder().setTitle("❌ Error ❌").setColor(ec.color)
                            .setDescription("Please Specify A Time Between 1 Second, And 28 Days!").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (reason.length > 512)
                        return interaction.followUp({
                        embeds: [new EmbedBuilder().setTitle("❌ Error ❌").setColor(ec.color)
                            .setDescription("Reason Can't Be More Than 512 Characters").setTimestamp()
                        ],
                        ephemeral: true
                });
                    target.timeout(timeInMs, reason);
                        return interaction.followUp({
                        embeds: [new EmbedBuilder()
                            .setColor(ec.color)
                            .setTitle(`**User Was Successfully Timeout!**`)
                            .setFooter({
                                text: `Requested by ${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({
                                 dynamic: true,
                                 format: "png",
                                 size: 2048,
                                }),
                               })
                            .setTimestamp()
                            .addFields({
                            name: "User:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        }, {
                            name: "Reason:",
                            value: `\`\`\`${reason}\`\`\``
                        },{
                            name: "Time In Timeout:",
                            value: `\`\`\`${length}\`\`\``
                        },
                        )
                        ],
                        ephemeral: true
                });
            }
                case "unmute": {
                    if (target.permissions.has("Administrator"))
                        return interaction.followUp({
                        embeds: [new EmbedBuilder().setTitle("❌ Error ❌").setColor(ec.color)
                            .setDescription(`${target.user.username} Is An Admin....?`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if(!target.communicationDisabledUntilTimestamp)
                        return interaction.followUp({
                        embeds: [new EmbedBuilder().setTitle("❌ Error ❌").setColor(ec.color)
                            .setDescription(`${target.user.username} Isn't Muted?`).setTimestamp()
                        ],
                        ephemeral: true
                });
                        await target.timeout(null)
                        return interaction.followUp({
                        embeds: [new EmbedBuilder()
                            .setColor(ec.color)
                            .setTitle("**User is Successfully Out Of Timeout!**")
                            .setFooter({
                                text: `Requested by ${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({
                                 dynamic: true,
                                 format: "png",
                                 size: 2048,
                                }),
                               })
                            .setTimestamp()
                            .addFields({
                            name: "User:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        },
                        {
                            name: "Reason:",
                            value: `\`\`\`${reason}\`\`\``
                        },
                        )
                        ],
                        ephemeral: true
                });
                }
                return;
            }
        } catch (e) {
        const errorEmbed = new EmbedBuilder()
            .setColor(ec.color)
            .setDescription(`🛑 Error: ${e}`)
        return interaction.followUp({
            embeds: [errorEmbed]
        })
        }
    }
}