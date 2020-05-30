export default class Card {
	constructor(number, type = '', isPlayed = false) {
		this.number = number;
		this.type = type;
		this.isPlayed = isPlayed;
		this.isDiscarded = false;
	}
}