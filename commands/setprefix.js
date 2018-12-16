const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;
const server = index.server;
const fs = require("fs");

module.exports = {
  name: "setprefix",
  execute: (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let sp =  server [message.guild.id].prefix;
    let chk = bot.emojis.get('500815339756584960');

    if(!message.member.hasPermission("ADMINISTRATOR")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`ADMINISTRATOR\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    if(!args[0]) {
      let embed = new Discord.RichEmbed()
      .setDescription(`**Usage:** \`${sp}setprefix <prefix>\``)
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    server[message.guild.id].prefix = args.join("").slice(0);
    fs.writeFileSync("./storage/servers.json", JSON.stringify (server));

    message.channel.send(`✅ • Updated the prefix to [**${args.join("").slice(0)}**].`);
  }
}
