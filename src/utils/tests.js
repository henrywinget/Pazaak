import Player from "./Player";
import Card from "./Card.js";

const tests = {
	allCardTypes: [
		new Card(2, '+'),
		new Card(5, '-'),
		new Card(3, '177'),
		new Card(1, ''),
	],
	
	players: [],
	
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

const testUser = new Player(true, 'Mr Awesome');
const testOpponent = new Player(false, 'Mr. Goingdown');

testUser.sideDeck = tests.allCardTypes;
testUser.roundWins = 2;
testUser.roundScore = 17;

testOpponent.sideDeck = tests.allCardTypes;
testOpponent.roundScore = 2;
tests.players = [testUser, testOpponent];

export default tests;