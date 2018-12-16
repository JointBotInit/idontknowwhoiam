const {
    Discord,
    Client,
    RichEmbed,
    Bot
  } = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const date = require("date-and-time");

module.exports = {
  name: "shp",
  aliases: ["shopembed"],
  execute: (message, args) => {
    
    
var request = require("request");
var options = { method: 'GET',
url: 'https://fnbr.co/api/shop',
headers: 
{ 'cache-control': 'no-cache',
'x-api-key': '31c4e0bf-60c1-4e56-b344-ec87a6dc2270' } };
    
    var fnbrapi;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      fnbrapi = JSON.parse(body);  
        fnbrapi.data.featured.forEach(data => {
            const embed = new RichEmbed()
                .setTitle(data.name)
                .setColor(5119)
                .setDescription(data.description)
                .setThumbnail(data.images.icon);
            message.channel.send(embed);
            //msg.channel.send('test');
            //msg.reply('Current news' + data.body);
        });
    
        fnbrapi.data.daily.forEach(data => {
            const embed2 = new RichEmbed()
                .setTitle(data.name)
                .setColor(0xFF0000)
                .setDescription(data.description)
                .setThumbnail(data.images.icon);
            message.channel.send(embed2);
            //msg.channel.send('test');
            //msg.reply('Current news' + data.body);
        });
    });
  }}
