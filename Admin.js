function help(msg) {
  msg.channel.send(
    'Use the prefix "?"\n' +
    'Commands: \n' +
    'start - followed by the four decks you want to play with, eg. ?start 1234\n' +
    'draw - draws a card\n' +
    'reset - throws current playing deck away\n' +
    'clear - deletes messages\n' +
    'size - debugging purposes\n'
  );
}

function clear(msg) {
  const args = msg.content.split(' ').slice(1); // All arguments behind the command name with the prefix
  const amount = parseInt(args.join(' ')); // Amount of messages which should be deleted

  if (!amount)
    return msg.reply('You haven\'t specified an amount of messages which should be deleted.'); // Checks if the `amount` parameter is given
  if (isNaN(amount))
    return msg.reply('The amount parameter isn`t a number.'); // Checks if the `amount` parameter is a number. If not, the command throws an error

  if (amount > 100)
    return msg.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
  if (amount < 1)
    return msg.reply('You have to delete at least 1 message.'); // Checks if the `amount` integer is smaller than 1

  msg.channel.messages.fetch({limit: amount}).then(messages => { // Fetches the messages
    msg.channel.bulkDelete(messages).then(() => {
        console.log('Deleted messages: ' + amount);
      }
    ); // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
  });
}

module.exports = {
  help,
  clear
};