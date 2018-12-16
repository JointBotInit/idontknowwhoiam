const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const config = require('./storage/config.json');
const YouTube = require('simple-youtube-api');
const prefix = config.prefix;
const ytdl = require("ytdl-core");
const server = require("./storage/servers.json");
const serverprefix = server.prefix
const antispam = require("discord-anti-spam"); //the main function for the anti spam
const art = require('asciiart-logo');
const youtube = new YouTube(`${config.ytapi}`);
const queue = new Map();
const chalk = require("chalk");
const date = require("date-and-time");
const ms = require("ms");
var request = require("request");
const {
  Client,
  RichEmbed
} = require('discord.js');
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
};



exports.bot = bot;
exports.server = server;
bot.commands = new Discord.Collection();

bot.on('error', console.error);

bot.on('guildCreate', async guild => {

  server [guild.id] = {
    serverName: guild.name,
    prefix: `${prefix}`,
    logs: "undefined",
    reports: "undefined",
    adblock: false,
    nsfw: false
  }
  
  let g = bot.guilds.get('500380149787656202');

  let ch = g.channels.get('501916448621330443');

  let now = new Date();
  const edate = date.format(now, 'MMM DD, YYYY');

  let embed = new Discord.RichEmbed()
  .setTitle(`📥 Guild Join | Guilds: ${bot.guilds.size}`)
  .addField(`OwnerID`, `${guild.owner.id}`)
  .addField(`ServerID`, `${guild.id}`)
  .addField(`Members`, `Count: \`${guild.memberCount}\``)
  .addField(`Region`, `${guild.region}`)
  .addField(`Date`, `${edate}`)
  .setThumbnail(guild.iconURL)
  .setColor(config.noembed);

  ch.send(embed);
});

//Listener
// Listener
bot.on("message", async(message) => {

  if (message.channel.type != "text") return;
  if (message.author.bot) return;
  const sp =  server [message.guild.id].prefix;
  const args = message.content.slice(sp.length).split(/ +/);
  const command = args.shift();

  if(message.content.includes('http')) {
    if(server[message.guild.id].adblock === false) return;
    if(message.member.hasPermission("MANAGE_GUILD")) return;
    message.delete();
    return;
  }

  if(message.mentions.members.first()) {

    if(message.mentions.members.first().id === '500379363133358100') {

      if(args.length > 0) return;
      message.channel.send(new Discord.RichEmbed().setColor(config.noembed).setDescription(`Bot Prefix: \`${sp}\`\n\nMain Menu: \`${sp}menu\``));
      return;
    }
  }

  if (message.author.bot && message.content.startsWith(sp)) return;
  if (!message.content.startsWith(sp)) return;

  let cmd = bot.commands.get(command.toLowerCase()) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command.toLowerCase()));
  if (cmd) cmd.execute(message,args);
});

// Bot isEnabled
bot.on('ready', async () => {

  
    // Command Handler
    const commandFiles = fs.readdirSync("./commands");
    commandFiles.forEach((file) => {
      const command = require(`./commands/${file}`);
      bot.commands.set(command.name, command);
    
    let ops = {
      ownerID: "224622958067449857"
    }
    
    });
  
  bot.user.setPresence({
    game: {
      name: `fe/store | Playing with ${bot.users.size} users`,
      type: "STREAMING",
      url: "https://twitter.com/FNBR_Everything"
  }
  });

});

bot.login(config.token);
