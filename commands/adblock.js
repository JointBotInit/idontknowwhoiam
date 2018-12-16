const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;
const fs = require("fs");
const server = index.server;

module.exports = {
  name: "adblock",
  execute: (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let ad = server[message.guild.id].adblock;
    let sp = server[message.guild.id].prefix;
    let chk = bot.emojis.get('500815339756584960');

    if(!message.member.hasPermission("MANAGE_GUILD")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`MANAGE_GUILD\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    if(!args[0]) {
      let embed = new Discord.RichEmbed()
      .setDescription(`${err} **Usage:** \`${sp}adblock on | off\``)
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "on") {
      if(ad != true) {
        server[message.guild.id].adblock = true;
        fs.writeFileSync("./storage/servers.json", JSON.stringify (server));
        message.channel.send(`✅ • Adblock Module has been enabled.`);
        return;
      }
      message.channel.send(`⛔ • Adblock Module is already enabled.`);
      return;
    }

    if(args[0].toLowerCase() === "off") {
      if(ad != false) {
        server[message.guild.id].adblock = false;
        fs.writeFileSync("./storage/servers.json", JSON.stringify (server));
        message.channel.send(`✅ • Adblock Module has been disabled.`);
        return;
      }
      message.channel.send(`⛔ • Adblock Module is already disabled.`);
      return;
    }
  }
}
