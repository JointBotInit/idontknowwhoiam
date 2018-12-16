const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const fs = require("fs");
const commandFiles = fs.readdirSync("./commands");

module.exports = {
  name: "binfo",
  aliases: ["botinfo"],
  execute: (message, args) => {

    let leafage = bot.users.get(`${config.leafage}`);
    let franix = bot.users.get(`${config.franix}`);

    let embed = new Discord.RichEmbed()
    .addField(`Creator`, `${leafage}`, true)
    .addField(`Version`, `${config.version}`, true)
    .addField(`Commands`, `Count: \`${commandFiles.length}\``, true)
    .addField(`Guilds`, `Count: \`${bot.guilds.size}\``, true)
    .addField(`Users`, `Count: \`${bot.users.size - 1}\``, true)
    .setColor(config.noembed);
    message.channel.send(embed);
  }
}
