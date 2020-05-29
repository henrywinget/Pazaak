import Player from "./Player";

const tests = {
	allCardTypes: [
		{
			number: 2,
			type: '+',
			isPlayed: false,
		},
		{
			number: 5,
			type: '-',
			isPlayed: true,
			
		},
		{
			number: 3,
			type: '+-',
			isPlayed: false,
			
		},
		{
			number: 1,
			type: '',
			isPlayed: false,
			
		}
	],
	
	players: []
};

const testUser = new Player(true);
const testOpponent = new Player(false);

testUser.sideDeck = tests.allCardTypes;
testOpponent.sideDeck = tests.allCardTypes;
tests.players = [testUser, testOpponent];

export default tests;