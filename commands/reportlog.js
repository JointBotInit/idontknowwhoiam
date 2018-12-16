const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;
const server = index.server;
const fs = require("fs");

module.exports = {
  name: "reportlog",
  execute: (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let sp =  server [message.guild.id].prefix;
    let chk = bot.emojis.get('500815339756584960');

    if(!message.member.hasPermission("MANAGE_GUILD")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`**Insufficient Permission**\n\nMissing Permission - \`MANAGE_GUILD\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    if(!args[0]) {
      let embed = new Discord.RichEmbed()
      .setDescription(`**Usage:** \`${sp}reportlog <#channel>\``)
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    let channel = message.mentions.channels.first();

    if(!channel) return message.channel.send(`⛔ • Please mention a valid channel.`);

    server[message.guild.id].reports = channel.id;
    fs.writeFileSync("./storage/servers.json", JSON.stringify (server));

    message.channel.send(`✅ • **Updated the report log to [${channel}].**`);
  }
}
