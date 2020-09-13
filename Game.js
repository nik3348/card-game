const Decks = require('./Decks');

class Game {
  constructor(id) {
    this.id = id;
    this.gameArray = [];
  }

  start(msg) {
    let numbersForGameS = msg.content.substring(7); //the numbers as a string
    console.log('Decks being added: ' + numbersForGameS);

    if (numbersForGameS.length < 1 || numbersForGameS.length > 4) { //there are only 4 decks; identified by chars 1-4
      msg.channel.send('Invalid deck number specified, please type "?help " for more info');
      return;
    }

    for (let i = 0; i < numbersForGameS.length; i++) {
      if (numbersForGameS.charAt(i) < '1' || numbersForGameS.charAt(i) > '4') { //there are only 4 decks; identified by chars 1-4
        msg.channel.send('Invalid deck number specified, please type "?help " for more info');
        this.gameArray = [];
        console.log('Emptied the game array; contained at least one wrong deck number in "start [decks]" command.');
        return;
      }

      switch (numbersForGameS.charAt(i)) {
        case '1':
          this.gameArray.push(Decks.extraDirtyCards);
          console.log('Loaded the extra dirty decks');
          break;
        case '2':
          this.gameArray.push(Decks.happyHourCards);
          console.log('Loaded the happy hour decks');
          break;
        case '3':
          this.gameArray.push(Decks.lastCallCards);
          console.log('Loaded the last call decks');
          break;
        case '4':
          this.gameArray.push(Decks.onTheRocksCards);
          console.log('Loaded the on the rocks decks');
          break;
        default:
          console.log('Invalid, failed prior validation.');
          break;
      }
    }
    msg.channel.send('Game cards filled and game is ready!');
  }

  draw(msg, Discord) {
    if (this.gameArray.length === 0) {
      msg.reply('There is no active game running with any cards. Type start to start a new game!');
      return;
    }

    let mentionedUser = msg.mentions.users.first();

    const chosen1st = Math.round(Math.random() * (this.gameArray.length - 1));
    const chosen2nd = Math.round(Math.random() * (this.gameArray[chosen1st].length - 1)); //generate random picker

    let stringURL = this.gameArray[chosen1st][chosen2nd];
    let title = '';
    let imageURL = '';
    let color = '';

    if (stringURL.includes('ExtraDirty')) {
      title = 'ExtraDirty';
      imageURL = stringURL.substring(stringURL.indexOf('ExtraDirty') + 11);
      color = '#ec0110';
    }
    if (stringURL.includes('HappyHour')) {
      title = 'HappyHour';
      imageURL = stringURL.substring(stringURL.indexOf('HappyHour') + 10);
      color = '#f7de6c';
    }
    if (stringURL.includes('LastCall')) {
      title = 'LastCall';
      imageURL = stringURL.substring(stringURL.indexOf('LastCall') + 9);
      color = '#140b32';
    }
    if (stringURL.includes('OnTheRocks')) {
      title = 'OnTheRocks';
      imageURL = stringURL.substring(stringURL.indexOf('OnTheRocks') + 11);
      color = '#0001b7';
    }

    this.gameArray[chosen1st].splice(chosen2nd, 1); //removes the picked question from the array

    const embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .attachFiles([stringURL])
      .setImage('attachment://' + imageURL);


    if(mentionedUser!=undefined)
      embed.setDescription('<@'+mentionedUser+'>' + ', this one\'s for you!');

    msg.delete();
    msg.channel.send(embed).then(() => console.log('Card drawn: ' + imageURL));
  }

  reset(msg) {
    this.gameArray = [];
    msg.channel.send('Main game deck has been refreshed. Type "?start [decks]" to start a new game.');
  }
}

module.exports = Game;