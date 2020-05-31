import { createContext } from 'react';
import { shuffle } from "../utils/gameFuncs";
export default createContext({
	playerOne: {},
	playerTwo: {},
	deck: shuffle(),
	roundsPlayed: 0,
	winningPlayer: {},
	gameStarted: false,
});