export default class Player {
	constructor(isUser) {
		this.isUser = isUser;
		this.roundWins = 0;
		this.valuesInPlay =  [];
		this.sideDeck = [];
	}
	
	hasWon() {
		return this.roundWins >= 3;
	}
	
	determineScore() {
		let value = 0;
		this.valuesInPlay.forEach(val => value += val);
		return value;
	}
}