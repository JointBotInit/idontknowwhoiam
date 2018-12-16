const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const server = index.server;

module.exports = {
  name: "menu",
  aliases: ["help"],
  execute: (message, args) => {

    const prefix = "?"
    
    let sp =  server [message.guild.id].prefix;
    

    let inv = bot.emojis.get('518780204571688990');
    let uv = bot.emojis.get('478870259944783873');
    let bg = bot.emojis.get('518781335335075850');

    if(!args[0]) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`Gigabot | Main Menu`, message.author.displayAvatarURL)
      .setDescription(`**»** [Support Server](https://discord.gg/2w5hCXF)\n\u200b`)
      .addField(`Statistics`, `**»** Guilds: ${bot.guilds.size}\n**»** Users: ${bot.users.size - 1}\n\u200b`)
      .addField(`:frog: Fun`, `\`${sp}help fun\``, true)
      .addField(`:no_entry: NSFW`, `\`${sp}help nsfw\``, true)
      .addField(`:tickets: Miscellaneous`, `\`${sp}help misc\``, true)
      .addField(`:oncoming_police_car: Moderation`, `\`${sp}help mod\``, true)
      .addField(`:wrench: Settings`, `\`${sp}help settings\``, true)
      .addField(`:musical_note: Music`, `\`${sp}help music\``, true)
      .addField(`:tools: Developer`, `\`${sp}help developer\`\n\u200b`, true)
      .addField(`Quick Links`, `${inv} [**Bot Invite**](https://discordapp.com/api/oauth2/authorize?client_id=500379363133358100&permissions=8&scope=bot) | ${bg} [**Report a Bug**](https://discord.gg/2w5hCXF⁯ | ${uv} [**Up Vote The Bot**](https://discordbots.org/)`, true)
      .setColor(config.noembed);

      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "fun") {

      let embed = new Discord.RichEmbed()
      .setTitle(`:frog: Fun • Module`)
      .setDescription(`**${sp}flip** - Flip a coin\n**${sp}gif** - Get a random gif\n**${sp}urban** - Search a definition on urban\n**${sp}8ball** - Ask the bot a question\n**${sp}upcomingcosmetics** - Get the upcoming fortnite cosmetics\n**${sp}shop** - Get the fortnite shop!`)
      .setColor("#77b255");

      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "nsfw") {

      let embed = new Discord.RichEmbed()
      .setTitle(`:no_entry: NSFW • Module`)
      .setDescription(`**${sp}nude** - Get a random nude\n**${sp}nsfw** - Enable / Disable this module`)
      .setColor("#be1931");

      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "misc") {

      let embed = new Discord.RichEmbed()
      .setTitle(`:tickets: Misc • Module`)
      .setDescription(`**${sp}binfo** - Information for Gigabot\n**${sp}sinfo** - Information for the server\n**${sp}mc** - View the member count for the server\n**${sp}user** - View user information\n**${sp}avatar** - Get the avatar or a user\n**${sp}invite** - Invite link for Gigabot`)
      .setColor("#ea596e");
      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "mod") {

      let embed = new Discord.RichEmbed()
      .setTitle(`🚔 Mod • Module`)
      .setDescription(`**${sp}id** - Get the id of a user\n**${sp}say** - Send a message\n**${sp}kick** - Kick a user\n**${sp}ban** - Ban a user\n**${sp}mute** - Mute a user\n**${sp}unmute** - Unmute a user\n**${sp}report** - Report a user\n**${sp}clear** - Clear some messages`)
      .setColor("#55acee");

      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "settings") {

      let embed = new Discord.RichEmbed()
      .setTitle(`:wrench: Settings • Module`)
      .setDescription(`**${sp}config** - View your settings\n**${sp}modlog** - Set the mod log\n**${sp}reportlog** - Set the report log\n**${sp}setprefix** - Set the prefix for Gigabot\n**${sp}adblock** - Enable / Disable Adblock`)
      .setColor("#8899a6");

      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "music") {

      let embed = new Discord.RichEmbed()
      .setTitle(`:musical_note: Music • Module`)
      .setDescription(`**${prefix}gplay** - Search a song to play! E.G ?gplay Rockstar\n**${prefix}gstop** - Stop the current song that's playing\n**${prefix}gqueue** - View the current music queue`)
      .setColor("#8899a6");

      message.channel.send(embed);
      return;
    }

    if(args[0].toLowerCase() === "developer" && "dev") {

      let err = bot.emojis.get('500728293482430466');

      if(!message.author.id.includes(config.leafage)) return message.channel.send("```❌   • Insufficient Permission```");
      message.channel.send("```✅   • You have access```");
      return;
    }
  }
}
