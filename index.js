const Admin = require('./Admin');
const Decks = require('./Decks');
const Game = require('./Game');
const Discord = require('discord.js');
const KEY = process.env.KEY;
const client = new Discord.Client();
const PREFIX = '?';

let sessions = [];

client.login(KEY).then(() =>
  console.log('Bot logged on')
);

client.on('ready', () => {
    console.log('Truth or Drink is ONLINE!');
    Decks.init();
  }
);

client.on('message', msg => {
  if (msg.content.startsWith(PREFIX)) {
    let guild = getSession(msg);
    let message = msg.content.substring(1).split(' ');

    switch (message[0]) {
      case 'start':
        guild.start(msg);
        break;
      case 'draw':
        guild.draw(msg, Discord);
        break;
      case 'reset':
        guild.reset(msg);
        break;
      case 'size':
        size(guild);
        break;
      case 'clear':
        Admin.clear(msg);
        break;
      case 'help':
        Admin.help(msg);
        break;
      default:
        break;
    }
  }
});

function getSession(msg) {
  console.log('Guild Id: ' + msg.guild.id);
  for (let x = 0; x < sessions.length; x++) {
    if (msg.guild.id.toString() === sessions[x].id) {
      return sessions[x];
    }
  }

  const newSession = new Game(msg.guild.id);
  sessions.push(newSession);
  return newSession;
}

function size(guild) {
  console.log('Number of Sessions: ' + sessions.length);
  console.log('Game array size: ' + guild.gameArray.length);
  console.log('Extra dirty array size: ' + Decks.extraDirtyCards.length);
  console.log('Happy array size: ' + Decks.happyHourCards.length);
  console.log('Last call array size: ' + Decks.lastCallCards.length);
  console.log('On the rocks array size: ' + Decks.onTheRocksCards.length);
}

// TODO: ORC