import uid from 'uid';
export default class Card {
	constructor(number, type = '', isPlayed = false) {
		this.id = uid();
		this.number = number;
		this.type = type;
		this.specialType = type === "177" ? "+" : '';
		this.isPlayed = isPlayed;
		this.isDiscarded = false;
	}
}