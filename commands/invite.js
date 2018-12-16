const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;

module.exports = {
  name: "invite",
  aliases: ["inv"],
  execute: (message, args) => {

    let inv = bot.emojis.get('500685084891021352');

    let embed = new Discord.RichEmbed()
    .setColor(config.noembed)
    .addField(`${inv} Invite Gigabot | ${bot.guilds.size} Server(s) using Gigabot`, `[**Invite Gigabot**](https://discordapp.com/api/oauth2/authorize?client_id=500379363133358100&permissions=8&scope=bot) | [**Support Server**](https://discord.gg/z5ngujR)`)

    message.channel.send(embed);
  }
}
