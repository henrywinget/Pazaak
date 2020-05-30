import Player from "./Player";
import Card from "./Card.js";
// import Game from "./Game";

const tests = {
	allCardTypes: [
		new Card(2, '+'),
		new Card(5, '-'),
		new Card(3, '177'),
		new Card(1, '+'),
	],
	
	players: [],
};

const testUser = new Player(true, 'Mr Awesome');
const testOpponent = new Player(false, 'Mr. Goingdown');

testUser.sideDeck = tests.allCardTypes;


testOpponent.sideDeck = tests.allCardTypes;
tests.players = [testUser, testOpponent];



export default tests;