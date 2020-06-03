import Player from "./Player";
import Card from "./Card.js";
// import Game from "./Game";
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

const tests = {
	allCardTypes: [
		new Card(2, '+'),
		new Card(5, '-'),
		new Card(3, '177'), // wow how special! unicode character for +-
		new Card(1, '+'),
	],
	
	players: [],
};

const testUser = new Player(true, 'Mr Awesome');
const testOpponent = new Player(false, 'Mr. Goingdown');

testUser.sideDeckInPlay = generateRandomSideDeck();
testOpponent.sideDeckInPlay = generateRandomSideDeck();
tests.players = [testUser, testOpponent];



export default tests;