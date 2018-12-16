const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const server = index.server;
const fs = require("fs");

module.exports = {
  name: "nsfw",
  execute: (message, args) => {

    let err = bot.emojis.get('449287667633618956>');
    let sp =  server [message.guild.id].prefix;

    if(!message.member.hasPermission("MANAGE_GUILD")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`❌ **Insufficient Permission**\n\nMissing Permission - \`MANAGE_GUILD\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    let channel = message.channel;
    let chk = bot.emojis.get('500815339756584960');

    if(!args[0]) {
      let embed = new Discord.RichEmbed()
      .setDescription(`${err} **Usage:** \`${sp}nsfw on | off\``)
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "on") {

      if(server[message.guild.id].nsfw === true) return message.channel.send(`${err} • NSFW Module is already enabled.`);
      server[message.guild.id].nsfw = true
      fs.writeFileSync("./storage/servers.json", JSON.stringify (server));

      message.channel.send(`${chk} • NSFW Module has been enabled.`);
      return;
    }

    if(args[0].toLowerCase() === "off") {

      if(server[message.guild.id].nsfw === false) return message.channel.send(`❌ • NSFW Module is already disabled.`);
      server[message.guild.id].nsfw = false
      fs.writeFileSync("./storage/servers.json", JSON.stringify (server));

      message.channel.send(`❌ • NSFW Module has been disabled.`);
      return;
    }
  }
}
