const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const got = require("got");

module.exports = {
  name: "gif",
  execute: async (message, args) => {

    let err = bot.emojis.get('500814919344717854');

    const random = await got(`http://api.giphy.com/v1/gifs/random?api_key=${config.giphy_api_key}`, {json: true});
    if( !random || !random.body || !random.body.data) return message.channel.send(`${err} Could not obtain any results.`);

    let embed = new Discord.RichEmbed()
    .setImage(`${random.body.data.image_url}`)
    .setColor(config.noembed);

    message.channel.send(embed);
    return;
  }
}