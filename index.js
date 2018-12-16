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

// OnGuild Join
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

bot.on('message', msg => {
  if (msg.content === `<@484090735298084864> your gay`) {
    msg.reply("Welp... Suppose you didn't think about who your calling that 😠😠😠");
  }
});

bot.on('guildDelete', async guild => {

  delete server[guild.id];
  fs.writeFileSync("./storage/servers.json", JSON.stringify (server));

  let g = bot.guilds.get('500380149787656202');

  let ch = g.channels.get('501916448621330443');

  let now = new Date();
  const edate = date.format(now, 'MMM DD, YYYY');

  let embed = new Discord.RichEmbed()
  .setTitle(`📤 Guild Leave | Guilds: ${bot.guilds.size}`)
  .addField(`OwnerID`, `${guild.owner.id}`)
  .addField(`ServerID`, `${guild.id}`)
  .addField(`Members`, `Count: \`${guild.memberCount}\``)
  .addField(`Region`, `${guild.region}`)
  .addField(`Date`, `${edate}`)
  .setThumbnail(guild.iconURL)
  .setColor(config.noembed);

  ch.send(embed);
});

// Bot isEnabled
bot.on('ready', async () => {

  
    // Command Handler
    const commandFiles = fs.readdirSync("./commands");
    commandFiles.forEach((file) => {
      const command = require(`./commands/${file}`);
      bot.commands.set(command.name, command);
    
    let ops = {
      ownerID: "325375993013338113"
    }
    
    });

  bot.user.setPresence({
    game: {
      name: `?help | Playing with ${bot.users.size} users`,
      type: "STREAMING",
      url: "https://www.twitch.tv/Gigabot"
  }
  });
  
  bot.user.setPresence({
    game: {
      name: `?help | Playing with ${bot.users.size} users`,
      type: "STREAMING",
      url: "https://www.twitch.tv/Gigabot"
  }
  });

});

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

bot.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

//anti spam
antispam(bot, {
  warnBuffer: 6, //Maximum amount of messages allowed to send in the interval time before getting warned.
  maxBuffer: 20, // Maximum amount of messages allowed to send in the interval time before getting banned.
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
  warningMessage: "Hello, don't spam. Gigabots has anti spam features. You'll be banned if you continue.", // Warning message send to the user indicating they are going to fast.
  banMessage: " was banned for spamming. Don't test Gigabots anti spam. Would anyone else like a try?", // Ban message, always tags the banned user in front of it.
  maxDuplicatesWarning: 7, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
  maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  deleteMessagesAfterBanForPastDays: 7 // Delete the spammed messages after banning for the past x days.
}); 




//MUSIC BIT
bot.on("message", async message => {
  var args = message.content.substring(prefix.length).split(" ");
  if (!message.content.startsWith(prefix)) return;
var searchString = args.slice(1).join(' ');
var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
var serverQueue = queue.get(message.guild.id);
  switch (args[0].toLowerCase()) {
    case "gplay":
  var voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
  var permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) {
    return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
  }
  if (!permissions.has('SPEAK')) {
    return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
  }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    var playlist = await youtube.getPlaylist(url);
    var videos = await playlist.getVideos();
    for (const video of Object.values(videos)) {
      var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
      await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
    }
    return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);
        var index = 0;
        message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
        `);
        // eslint-disable-next-line max-depth
        try {
          var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
            maxMatches: 1,
            time: 10000,
            errors: ['time']
          });
        } catch (err) {
          console.error(err);
          return message.channel.send('No or invalid value entered, cancelling video selection.');
        }
        var videoIndex = parseInt(response.first().content);
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
      } catch (err) {
        console.error(err);
        return message.channel.send('🆘 I could not obtain any search results.');
      }
    }
    return handleVideo(video, message, voiceChannel);
  }
      break;
    case "gskip":
  if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
  if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
  serverQueue.connection.dispatcher.end('Skip command has been used!');
  return undefined;
      break;
    case "gstop":
  if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
  if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('Stop command has been used & disconnected from the voice channel');
  return undefined;
break;
    case "gvolume":
  if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
  serverQueue.volume = args[1];
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
  return message.channel.send(`I set the volume to: **${args[1]}**`);
break;
    case "gnp":
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
break;
    case "gqueue":
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
  `);
break;
    case "gpause":
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send('⏸ Paused the music for you!');
  }
  return message.channel.send('There is nothing playing.');
break;
    case "gresume":
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send('▶ Resumed the music for you!');
  }
  return message.channel.send('There is nothing playing.');


return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
var serverQueue = queue.get(message.guild.id);
console.log(video);
var song = {
  id: video.id,
  title: video.title,
  url: `https://www.youtube.com/watch?v=${video.id}`
};
if (!serverQueue) {
  var queueConstruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true
  };
  queue.set(message.guild.id, queueConstruct);

  queueConstruct.songs.push(song);

  try {
    var connection = await voiceChannel.join();
    queueConstruct.connection = connection;
    play(message.guild, queueConstruct.songs[0]);
  } catch (error) {
    console.error(`I could not join the voice channel: ${error}`);
    queue.delete(message.guild.id);
    return message.channel.send(`I could not join the voice channel: ${error}`);
  }
} else {
  serverQueue.songs.push(song);
  console.log(serverQueue.songs);
  if (playlist) return undefined;
  else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
}
return undefined;
}
function play(guild, song) {
var serverQueue = queue.get(guild.id);

if (!song) {
  serverQueue.voiceChannel.leave();
  queue.delete(guild.id);
  return;
}
console.log(serverQueue.songs);

const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
  .on('end', reason => {
    message.channel.send('``The queue of song is end.``');
    if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
    else console.log(reason);
    serverQueue.songs.shift();
    play(guild, serverQueue.songs[0]);
  })
  .on('error', error => console.error(error));
dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}
});


bot.login(config.token);
