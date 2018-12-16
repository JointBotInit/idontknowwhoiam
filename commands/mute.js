const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const server = index.server;
const bot = index.bot;

module.exports = {
  name: "mute",
  execute: (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let sp =  server [message.guild.id].prefix;
    let chk = bot.emojis.get('500815339756584960');

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`MANAGE_MESSAGES\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    let mUser = message.mentions.members.first();

    let Muted = message.guild.roles.find(r => r.name === "Muted");

    if(!Muted) {

    }

    let reason = args.join(" ").slice(22);
    var logs = server[message.guild.id].logs;

    if(!mUser) return message.channel.send(new Discord.RichEmbed().setDescription(`${err} **Usage** \`${sp}mute <@user> <reason>\``).setColor(config.noembed));

    if(mUser.user.username === message.author.username) return message.channel.send(`${err} • Invalid Operation`);

    if(mUser.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${err} • Insufficient Permission`);

    if(mUser.roles.has(Muted.id)) message.channel.send(`${err} • ${mUser.user} is already muted.`);

    if(!reason) return message.channel.send(new Discord.RichEmbed().setDescription(`${err} • **Usage** \`${sp}mute <@user> <reason>\``).setColor(config.noembed));

    message.delete();

    message.channel.send(new Discord.RichEmbed().setColor(config.color).setDescription(`${chk} • ${mUser.user} was muted for ${reason}`));

    mUser.addRole(Muted);

    if(server[message.guild.id].log != "undefined") {
      log.send(embed);
    }
  }
}
