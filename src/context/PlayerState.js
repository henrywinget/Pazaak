import React, { useReducer } from 'react';

import {
	playerReducer,
	SET_PLAYER,
	CHANGE_NAME,
} from "./playerReducer";

import PlayerContext from './player-context';
import uid from "uid";
import Card from "../utils/Card";

function generateRandomSideDeck () {
	let cards = [];
	for(let i = 0; i < 4; i++) {
		const num = Math.floor(Math.random() * Math.floor(5)) + 1;
		let type = '';
		switch(Math.floor(Math.random() * Math.floor(3)) + 1) {
			case 1:
				type = '+';
				break;
			case 2:
				type = '-';
				break;
			case 3:
				type = '177';
				break;
			default:
				console.log('Say whaaaaaaaaaaaat?');
		}
		cards.push(new Card(num, type));
	}
	return cards;
}

const initialState = {
	id: uid(18),
	isUser: false,
	name: '',
	portrait: '',
	// to implement a more RPG style
	cool: 0, // used to determine who goes first, higher cool less likely chance of going first (no repercussions)
	coercion: 0, // used to bait the opponent into holding out for one more card when they would otherwise stand (no repercussions)
	deception: 0, // used to attempt to get out of repercussions if caught cheating to avoid loss stat and money loss
	negotiation: 0, // used to negotiate higher bids and bribe if caught cheating to avoid a loss stat
	charm: 0, // used to negotiate higher bids, bait the opponent, attempt to get out of repercussions if caught cheating with opposite sex
	skulduggery: 0, // used to cheat to pick up an extra side card (failure could mean auto loss)
	computers: 0, // used to cheat to trick the computer to dealing the card you need (could lead to less than desirable card and multiple failures could mean auto loss)
	perception: 0, // used to tell if the opponent is cheating (passive, no repercussions could result in auto win)
	streetwise: 0, // adds an overall luck boost to all stats (potential advantage rolls, no repercussions)
	// base
	isTurn: false,
	didStand: false,
	isBust: false,
	isPlayerOne: false, // just to remember who went first in the game!!
	playedCardThisRound: false,
	roundScore: 0,
	roundWins: 0,
	valuesInPlay:  [],
	sideDeck: [],
	sideDeckInPlay: generateRandomSideDeck(),
	gameWins: 0,
	gameLosses: 0,
	drawSpace: [
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

const PlayerState = props => {
	const [playerState, dispatch] = useReducer(playerReducer, initialState);
	
	const setPlayer = player => dispatch({type: SET_PLAYER, player});
	const handleNameInput = name => dispatch({type: CHANGE_NAME, name});
	
	return (
		<PlayerContext.Provider value ={{
			...playerState,
			setPlayer,
			handleNameInput,
		}}>
			{props.children}
		</PlayerContext.Provider>
	);
	
};

export default PlayerState;