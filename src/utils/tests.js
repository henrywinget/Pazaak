import Player from "./Player";

export default {
	allCardTypes: [
		{
			number: 2,
			type: '+'
		},
		{
			number: 5,
			type: '-'
		},
		{
			number: 3,
			type: '+-'
		},
		{
			number: 1,
			type: ''
		}
	],
	
	players: [
		new Player(true),
		new Player(false)
	]
}