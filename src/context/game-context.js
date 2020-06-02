import { createContext } from 'react';
import { shuffle } from "../utils/gameFuncs";
export default createContext({
	playerOne: {},
	playerTwo: {},
	deck: shuffle(),
	playerStood: false,
	playerIsBust: false,
	roundsPlayed: 0,
	winningPlayer: {},
	gameStarted: false,
});