import React, { useState, useReducer } from 'react';

import { gameReducer, SHUFFLE_DECK, DRAW_CARD } from "./reducers";

import GameContext from './game-context';

const initialState = {
	playerOne: {},
	playerTwo: {},
	deck: [],
	roundsPlayed: 0,
	winningPlayer: {},
	gameStarted: false
};

function GameState(props) {
	
	const [gameState, dispatch] = useReducer(gameReducer, initialState);
	
	const shuffleCards = () => {
		dispatch({type: SHUFFLE_DECK});
	};
	
	const drawCard = player => {
		dispatch({type: DRAW_CARD, player })
	};
	
	
	return (
		<GameContext.Provider value={{
			deck: gameState.deck,
			roundsPlayed: gameState.roundsPlayed,
			winningPlayer: gameState.winningPlayer,
			gameStarted: gameState.gameStarted,
			playerOne: gameState.playerOne,
			playerTwo: gameState.playerTwo,
		}}>
			{props.children}
		</GameContext.Provider>
	);
}

export default GameState;