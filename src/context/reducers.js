import { drawSpace, shuffle } from "../utils/gameFuncs";

export const SHUFFLE_DECK = "SHUFFLE_DECK";
export const DRAW_CARD = "DRAW_CARD";
export const STAND_ROUND = "STAND_ROUND";
export const RESET_ROUND = "RESET_ROUND";
export const END_ROUND = "END_ROUND";
export const START_GAME = "START_GAME";
export const DETERMINE_PLAYER_ONE = "DETERMINE_PLAYER_ONE";
export const PLAY_SIDE_CARD = "PLAY_SIDE_CARD";

const determinePlayers = (player, state) => {
	const players = {};
	if(player.id === state.playerOne.id) {
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

export const playSideCard = (cardPlayed, player, state) => {
	const { thisPlayerKey, thisPlayer } = determinePlayers(player, state);
	const valuesInPlay = [...player.valuesInPlay];
	const drawSpace = [...player.drawSpace];
	const sideDeckInPlay = [...player.sideDeckInPlay];
	let { roundScore } = player;
	let { type, specialType, number, id } = cardPlayed;
	switch(type) {
		case "+":
			roundScore += number;
			break;
		case "-":
			roundScore -= number;
			break;
		case "177":
			if(specialType === "+") {
				roundScore += number;
			} else {
				roundScore -= number;
			}
			break;
		default:
			console.log("How did this get in there?");
	}
	valuesInPlay.push(cardPlayed);
	valuesInPlay.forEach((card, index) => {
		drawSpace[index].card = card;
		drawSpace[index].hasCard = true;
	});
	sideDeckInPlay.forEach((card) => {
		if(card.id === id
			&& card.type === type
			&& card.number === number) { // I want to be damn sure with all this JS object reference
			card.isPlayed = true;
		}
	});
	
	return {
		...state,
		[thisPlayerKey]: {
			...thisPlayer,
			roundScore,
			valuesInPlay,
			sideDeckInPlay,
			drawSpace,
		}
	}
	
};

export const shuffleCards = state => {
	console.log("Shuffling cards..");
	return { ...state, deck: shuffle()};
};

export const drawCard = (player, state) => {
	// this is all a little more complicated than it might need to be
	// I tried having it a little more optimized, but it didn't work right
	console.log(`${player.name} is drawing a card with a ${player.roundScore}`);
	const cards = [...state.deck];
	const cardDrawn = cards.shift();
	let { roundScore } = player;
	roundScore += cardDrawn.number;
	let isBust = false;
	const { thisPlayerKey, nextPlayerKey, nextPlayer } = determinePlayers(player, state);
	const valuesInPlay = [...player.valuesInPlay];
	const drawSpace = [...player.drawSpace];
	valuesInPlay.push(cardDrawn);
	valuesInPlay.forEach((card, index) => {
		drawSpace[index].card = card;
		drawSpace[index].hasCard = true;
	});
	if(player.roundScore > 20) {
		isBust = true;
	}
	return {
		...state,
		deck: cards,
		playerStood: false,
		playerIsBust: isBust,
		[thisPlayerKey]: {
			...player,
			isTurn: true,
			roundScore,
			isBust,
			valuesInPlay,
			drawSpace,
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
	let firstPlayerScore = firstPlayer.roundWins;
	let secondPlayerScore = secondPlayer.roundWins;
	
	if(firstPlayer.roundScore <= 20 && secondPlayer.roundScore <= 20) {
		if(firstPlayer.roundScore > secondPlayer.roundScore) {
			firstPlayerScore++;
		} else if (secondPlayer.roundScore > firstPlayer.roundScore) {
			secondPlayerScore++;
		}
	} else if(firstPlayer.roundScore > 20 && secondPlayer.roundScore <= 20) {
		secondPlayerScore++;
	} else if (secondPlayer.roundScore > 20 && firstPlayer.roundScore <= 20) {
		firstPlayerScore++;
	}
	
	return {
		...state,
		playerOne: {
			...firstPlayer,
			didStand: false,
			isTurn: !firstPlayer.isTurn,
			isBust: false,
			valuesInPlay: [],
			drawSpace: drawSpace(),
			roundScore: 0,
			roundWins: firstPlayerScore,
		},
		playerTwo: {
			...secondPlayer,
			didStand: false,
			isTurn: !secondPlayer.isTurn,
			isBust: false,
			valuesInPlay: [],
			drawSpace: drawSpace(),
			roundScore: 0,
			roundWins: secondPlayerScore,
		},
		roundsPlayed: state.roundsPlayed++,
		gameStarted: false,
		playerStood: false,
	}
};

export const standRound = (player, state) => {
	console.log(`${player.name} is standing with a ${player.roundScore}`);
	const { thisPlayer,  thisPlayerKey, } = determinePlayers(player, state);
	return {
		...state,
		playerStood: true,
		[thisPlayerKey]: {
			...thisPlayer,
			didStand: true,
			isBust: thisPlayer.roundScore > 20,
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
		case PLAY_SIDE_CARD:
			return playSideCard(action.card, action.player, state);
		default:
			return state;
	}
};