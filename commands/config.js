const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;
const server = index.server;

module.exports = {
  name: "config",
  execute: (message, args) => {

    let err = bot.emojis.get('449280056322162708');
    let chk = bot.emojis.get('500815339756584960');
    let off = bot.emojis.get('501579320788254721');
    let on = bot.emojis.get('501579314450399242');

    if(!message.member.hasPermission("MANAGE_GUILD")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`MANAGE_GUILD\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    var sp =  server [message.guild.id].prefix;
    var logs = server[message.guild.id].logs;
    var rep = server[message.guild.id].reports;
    var ad = server[message.guild.id].adblock;
    var nsfw = server[message.guild.id].nsfw;

    if(server[message.guild.id].logs === `${err}`) var logs = `${off} \`Disabled\``;

    if(server[message.guild.id].logs != `${err}`) var logs = `${on} <#${server[message.guild.id].logs}>`;

    if(server[message.guild.id].reports === "undefined") var rep = `${off} \`Disabled\``;

    if(server[message.guild.id].reports != "undefined") var rep = `${on} <#${server[message.guild.id].reports}>`;

    if(nsfw === false) var nsfw = `${off} \`Disabled\``;

    if(nsfw === true) var nsfw = `${on} \`Enabled\``;

    if(ad === false) var ad = `${off} \`Disabled\``;

    if(ad === true) var ad = `${on} \`Enabled\``;

    let embed = new Discord.RichEmbed()
    .setTitle(`⚙ Gigabot's Config`)
    .setDescription(`${message.guild.name} | \`${sp}help settings\`\n\n**• | Mod Log**\n${logs}\n\n**• | Report Log**\n${rep}\n\n**• | NSFW Module**\n${nsfw}\n\n**• | Adblock Module**\n${ad}`)
    .setColor(config.noembed);

    message.channel.send(embed);
  }
}
