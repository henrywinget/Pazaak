import React, { useReducer } from 'react';

import {
	gameReducer,
	SHUFFLE_DECK,
	DRAW_CARD,
	END_ROUND,
	STAND_ROUND,
	RESET_ROUND,
	START_GAME,
	DETERMINE_PLAYER_ONE,
	PLAY_SIDE_CARD,
} from "./reducers";
import tests from "../utils/tests";
import { shuffle } from "../utils/gameFuncs";
import GameContext from './game-context';

const initialState = {
	playerOne: tests.players[0],
	playerTwo: tests.players[1],
	deck: shuffle(),
	roundsPlayed: 0,
	winningPlayer: {},
	gameStarted: false,
	playerStood: false,
};

const GameState = props => {
	
	const [gameState, dispatch] = useReducer(gameReducer, initialState);
	
	const startGame = () => dispatch({type: START_GAME});
	const shuffleCards = () => dispatch({type: SHUFFLE_DECK});
	const drawCard = player => dispatch({type: DRAW_CARD, player });
	const standRound = player => dispatch({type: STAND_ROUND, player });
	const resetRound = () => dispatch({type: RESET_ROUND});
	const endRound = () => dispatch({type: END_ROUND});
	const determinePlayerOne = () => dispatch({type: DETERMINE_PLAYER_ONE });
	const playSideCard = (card, player) => dispatch({type: PLAY_SIDE_CARD, card, player });
	
	return (
		<GameContext.Provider value={{
			deck: gameState.deck,
			roundsPlayed: gameState.roundsPlayed,
			winningPlayer: gameState.winningPlayer,
			gameStarted: gameState.gameStarted,
			playerOne: gameState.playerOne,
			playerTwo: gameState.playerTwo,
			playerStood: gameState.playerStood,
			playerIsBust: gameState.playerIsBust,
			shuffleCards,
			drawCard,
			standRound,
			resetRound,
			endRound,
			startGame,
			determinePlayerOne,
			playSideCard,
		}}>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameState;