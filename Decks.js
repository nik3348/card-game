class Decks {
  constructor() {
    this.extraDirtyCards = [];
    this.happyHourCards = [];
    this.lastCallCards = [];
    this.onTheRocksCards = [];
  }

  init() { //fills arrays with URL for decks
    this.fillExtraDirty();
    this.fillHappyHour();
    this.fillLastCall();
    this.fillOnTheRocks();
    console.log('Loaded decks into memory ?start to load game');
  }

  fillExtraDirty() {
    for (let i = 0; i < 55; i++) {
      this.extraDirtyCards.push('./decks/ExtraDirty/ExtraDirty' + i + '.png');
    }
  }

  fillHappyHour() {
    for (let i = 0; i < 55; i++) {
      this.happyHourCards.push('./decks/HappyHour/HappyHour' + i + '.png');
    }
  }

  fillLastCall() {
    for (let i = 0; i < 55; i++) {
      this.lastCallCards.push('./decks/LastCall/LastCall' + i + '.png');
    }
  }

  fillOnTheRocks() {
    for (let i = 0; i < 55; i++) {
      this.onTheRocksCards.push('./decks/OnTheRocks/OnTheRocks' + i + '.png');
    }
  }
}

module.exports = new Decks();