const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;
const server = index.server;
const fs = require("fs");

module.exports = {
  name: "eval",
  execute: (message, args) => {
    fn: (msg, suffix) => {
      const util = require('util')
      try {
        const returned = eval(suffix) // eslint-disable-line no-eval
        let str = util.inspect(returned, {
          depth: 1
        })
        if (str.length > 1900) {
          str = str.substr(0, 1897)
          str = str + '...'
        }
        str = str.replace(new RegExp(process.env.BOT_TOKEN, 'gi'), '( ͡° ͜ʖ ͡°)')
        msg.channel.createMessage('```js\n' + str + '\n```').then((ms) => {
          if (returned !== undefined && returned !== null && typeof returned.then === 'function') {
            returned.then(() => {
              let str = util.inspect(returned, {
                depth: 1
              })
              if (str.length > 1900) {
                str = str.substr(0, 1897)
                str = str + '...'
              }
              ms.edit('```js\n' + str + '\n```')
            }, (e) => {
              let str = util.inspect(e, {
                depth: 1
              })
              if (str.length > 1900) {
                str = str.substr(0, 1897)
                str = str + '...'
              }
              ms.edit('```js\n' + str + '\n```')
            })
          }
        })
      } catch (e) {
        msg.channel.createMessage('```js\n' + e + '\n```')
      }
    }
  }}