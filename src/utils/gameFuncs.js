import Card from "./Card";
export const shuffle = () =>  {
	let cards = [];
	// there are 40 cards in a Pazaak deck, numbers 1-10, 4 times
	for(let i = 1; i < 11; i++) {
		for(let j = 0; j < 4; j++) {
			cards.push(new Card(i));
		}
	}
	return cards.sort(() => Math.random() - 0.5);
};

export const drawSpace = () => {
	return [
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
		{ card: {}, hasCard: false},
	]
};

export default {
	shuffle,
	drawSpace,
};