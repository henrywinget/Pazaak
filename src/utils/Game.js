// import Card from "./Card";

export default class Game {
	constructor(playerOne, playerTwo) {
		// playerOne will always go first
		this.playerOne = playerOne;
		this.playerTwo = playerTwo;
		this.deck = [];
		this.roundsPlayed = 0;
		this.winningPlayer = {};
		this.gameStarted = false;
	}
	
	// shuffleCards() {
	// 	let cards = [];
	// 	// there are 40 cards in a Pazaak deck, numbers 1-10, 4 times
	// 	for(let i = 1; i < 11; i++) {
	// 		for(let j = 0; j < 4; j++) {
	// 			cards.push(new Card(i));
	// 		}
	// 	}
	// 	this.deck = cards.sort(() => Math.random() - 0.5);
	// }
	//
	// drawCard(player) {
	// 	if(this.deck.length > 0) {
	// 		const cardDrawn = this.deck.shift();
	// 		player.valuesInPlay.push(cardDrawn);
	// 		player.valuesInPlay.forEach((card, index) => {
	// 			player.drawSpace[index].card = card;
	// 			player.drawSpace[index].hasCard = true;
	// 		});
	// 		player.roundScore += cardDrawn.number;
	// 		this.calculateScore(player);
	// 	}
	// 	else {
	// 		this.shuffleCards();
	// 		this.drawCard(player);
	// 	}
	// }
	//
	// calculateScore(player) {
	// 	if(player.roundScore > 20) {
	// 		player.isBust = true;
	// 	}
	// }
	//
	// startGame() {
	// 	console.log('Starting game...');
	// 	this.gameStarted = true;
	// 	this.shuffleCards();
	// 	this.drawCard(this.playerOne);
	// }
	
}