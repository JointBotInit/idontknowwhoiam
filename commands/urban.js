const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const ud = require("urban-dictionary");

module.exports = {
  name: "urban",
  execute: (message, args) => {

    let word = args.join(" ");
    let define = args.join("+");
    let err = bot.emojis.get('500814919344717854');

    if(!args[0]) {
      message.channel.send(`${err} • Please provide a valid word or phrase.`)
      return;
    }

    ud.term(define, (error, entries, tags, sounds) => {
      if(error) {
        message.channel.send(`${err} • Could not find any results for _${word}_.`);
        return;
      }

      let embed = new Discord.RichEmbed()
      .addField(`📖 Urban Dictionary`, `__**Definition:**__ [_${entries[0].word}_](${entries[0].permalink})\n\n${entries[0].definition}\n\n__**Example:**__\n\n_${entries[0].example}_`)
      .setTimestamp()
      .setFooter(`Searched by ${message.author.username}#${message.author.discriminator}`)
      .setColor(config.noembed);

      message.channel.send(embed);
    })
  }
}
