import Card from "../utils/Card";
import { drawSpace, shuffle } from "../utils/gameFuncs";

export const SHUFFLE_DECK = "SHUFFLE_DECK";
export const DRAW_CARD = "DRAW_CARD";
export const STAND_ROUND = "STAND_ROUND";
export const RESET_ROUND = "RESET_ROUND";
export const END_ROUND = "END_ROUND";
export const START_GAME = "START_GAME";
export const DETERMINE_PLAYER_ONE = "DETERMINE_PLAYER_ONE";

const determinePlayers = (player, state) => {
	const players = {};
	if(player.id === state.playerOne.id) {
		players.thisPlayer = {...state.playerOne};
		players.nextPlayer = {...state.playerTwo};
	}
	else {
		players.thisPlayer = {...state.playerTwo};
		players.nextPlayer = {...state.playerOne};
	}
	players.thisPlayerKey = players.isPlayerOne ? 'playerOne' : 'playerTwo';
	players.nextPlayerKey = !players.isPlayerOne ? 'playerOne' : 'playerTwo';
	return players;
};

export const determinePlayerOne = state => {
	console.log('Determining player');
	let coin = Math.floor(Math.random() * Math.floor(2));
	const playerOneClone = {...state.playerOne};
	const playerTwoClone = {...state.playerTwo};
	if(coin === 1) {
		console.log(`${playerOneClone.name} is first`);
	} else {
		console.log(`${playerTwoClone.name} is first`);
	}
	return {
		...state,
		playerOne: {
			...playerOneClone,
			isTurn: coin === 1,
		},
		playerTwo: {
			...playerTwoClone,
			isTurn: coin !== 1,
		},
	}
	
};

export const resetPlayerRound = state => {
	const firstPlayer = {...state.playerOne};
	const secondPlayer = {...state.playerTwo};
	firstPlayer.roundScore = 0;
	secondPlayer.roundScore = 0;
	firstPlayer.drawSpace = drawSpace();
	secondPlayer.drawSpace = drawSpace();
	firstPlayer.valuesInPlay = [];
	secondPlayer.valuesInPlay = [];
	return {
		...state,
		playerOne: {
			...firstPlayer,
			roundScore: 0,
			drawSpace: drawSpace(),
			valuesInPlay: [],
		},
		playerTwo: {
			...secondPlayer,
			roundScore: 0,
			drawSpace: drawSpace(),
			valuesInPlay: [],
		},
	}
};

export const shuffleCards = state => {
	console.log("Shuffling cards..");
	return { ...state, deck: shuffle()};
};

export const drawCard = (player, state) => {
	console.log(`${player.name} is drawing a card.`);
	const cards = [...state.deck];
	const cardDrawn = cards.shift();
	let { roundScore } = player;
	roundScore += cardDrawn.number;
	let isBust = false;
	let playerKey = player.isPlayerOne ? 'playerOne' : 'playerTwo';
	const { nextPlayerKey, nextPlayer } = determinePlayers(player, state);
	const valuesInPlay = [...player.valuesInPlay];
	const playerDrawSpace = [...player.drawSpace];
	valuesInPlay.push(cardDrawn);
	valuesInPlay.forEach((card, index) => {
		playerDrawSpace[index].card = card;
		playerDrawSpace[index].hasCard = true;
	});
	if(player.roundScore > 20) {
		isBust = true;
	}
	return {
		...state,
		deck: cards,
		[playerKey]: {
			...player,
			isTurn: true,
			roundScore,
			isBust,
			valuesInPlay,
			drawSpace: playerDrawSpace,
		},
		[nextPlayerKey]: {
			...nextPlayer,
			isTurn: false
		},
		gameStarted: true,
	}
};

export const endRound = state => {
	console.log(`Round over.`);
	const firstPlayer = {...state.playerOne};
	const secondPlayer = {...state.playerTwo};
	return {
		...state,
		playerOne: {
			...firstPlayer,
			roundWins: firstPlayer.roundScore < secondPlayer.roundScore ? firstPlayer.roundWins++ : firstPlayer.roundWins,
		},
		playerTwo: {
			...secondPlayer,
			roundWins: firstPlayer.roundScore > secondPlayer.roundScore? secondPlayer.roundWins++ : secondPlayer.roundWins,
		},
		roundsPlayed: state.roundsPlayed++,
	}
};

export const standRound = (player, state) => {
	console.log(`${player.name} is standing.`);
	const { thisPlayer,  thisPlayerKey } = determinePlayers(player, state);
	return {
		...state,
		[thisPlayerKey]: {
			...thisPlayer,
			didStand: true,
		},
	}
};


export const gameReducer = (state, action) => {
	switch(action.type) {
		case SHUFFLE_DECK:
			return shuffleCards(state);
		case DRAW_CARD:
			return drawCard(action.player, state);
		case STAND_ROUND:
			return standRound(action.player, state);
		case RESET_ROUND:
			return resetPlayerRound(state);
		case END_ROUND:
			return endRound(state);
		case DETERMINE_PLAYER_ONE:
			return determinePlayerOne(state);
		default:
			return state;
	}
};