import { createContext } from 'react';

export default createContext({
		// playerOne will always go first
	playerOne: {},
	playerTwo: {},
	deck: [],
	roundsPlayed: 0,
	winningPlayer: {},
	gameStarted: false,
});