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

export const determineCardScore = (score, { number, type, specialType }) => {
	let num = 0;
	switch(type) {
		case "+":
			num = score + number;
			break;
		case "-":
			num = score - number;
			break;
		case "177":
			if(specialType === "+") {
				num = score + number;
			} else if (specialType === "-") {
				num = score - number;
			}
			break;
		default:
			console.log('Unable to determine type for card.');
	}
	return num;
};

export const determinePlayers = (player, state) => {
	const players = {};
	const id = typeof player === 'object' ? player.id : player;
	if(id === state.playerOne.id) {
		players.thisPlayer = {...state.playerOne};
		players.nextPlayer = {...state.playerTwo};
		players.thisPlayerKey = 'playerOne';
		players.nextPlayerKey = 'playerTwo';
	}
	else {
		players.thisPlayer = {...state.playerTwo};
		players.nextPlayer = {...state.playerOne};
		players.thisPlayerKey = 'playerTwo';
		players.nextPlayerKey = 'playerOne';
	}
	return players;
};

export default {
	shuffle,
	drawSpace,
	determinePlayers,
};