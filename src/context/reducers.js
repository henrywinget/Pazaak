import Card from "../utils/Card";
import { shuffle } from "../utils/gameFuncs";

export const SHUFFLE_DECK = "SHUFFLE_DECK";
export const DRAW_CARD = "DRAW_CARD";


export const shuffleCards = state => {
	return { ...state, deck: shuffle()};
};

export const drawCard = (player, state) => {
	const cards = [...state.deck];
	const playerClone = {...player};
	const cardDrawn = cards.shift();
	
	let playerKey = playerClone.isPlayerOne ? 'playerOne' : 'playerTwo';
	
	playerClone.valuesInPlay.push(cardDrawn);
	playerClone.valuesInPlay.forEach((card, index) => {
		playerClone.drawSpace[index].card = card;
		playerClone.drawSpace[index].hasCard = true;
	});
	playerClone.roundScore += cardDrawn.number;
	if(playerClone.roundScore > 20) {
		playerClone.isBust = true;
	}
	
	return {
		...state,
		deck: cards,
		[playerKey]: playerClone
	}
};



export const gameReducer = (state, action) => {
	switch(action.type) {
		case SHUFFLE_DECK:
			return shuffleCards(state);
		case DRAW_CARD:
			return drawCard(action.player, state);
			return;
		default:
			return state;
	}
};