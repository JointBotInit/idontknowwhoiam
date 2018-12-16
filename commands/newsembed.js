const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;
const fs = require("fs");
const server = index.server;

var request = require("request");
var options = { method: 'GET',
  url: 'https://fnbr.co/api/news',
  headers: 
   { 'cache-control': 'no-cache',
     'x-api-key': `${config.fnbrapi}` } };

module.exports = {
    name: "news",
    aliases: ["news"],
    execute: async (message, args) => {



    
    
    
}};