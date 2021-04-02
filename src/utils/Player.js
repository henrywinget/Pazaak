import uid from 'uid';

export default class Player {
	constructor(isUser, name) {
		this.id = uid(18);
		this.isUser = isUser;
		this.name = name;
		this.portrait = '';
		// to implement a more RPG style
		this.cool = 0; // used to determine who goes first, higher cool means you're less likely chance of going first (no repercussions)
		this.coercion = 0; // used to bait the opponent into holding out for one more card when they would otherwise stand (no repercussions)
		this.deception = 0; // used to attempt to get out of repercussions if caught cheating to avoid loss stat and money loss
		this.negotiation = 0; // used to negotiate higher bids and bribe if caught cheating to avoid a loss stat
		this.charm = 0; // used to negotiate higher bids, bait the opponent, attempt to get out of repercussions if caught cheating with opposite sex
		this.skulduggery = 0; // used to cheat to pick up an extra side card (failure could mean auto loss)
		this.computers = 0; // used to cheat to trick the computer to dealing the card you need (could lead to less than desirable card and multiple failures could mean auto loss)
		this.perception = 0; // used to tell if the opponent is cheating (passive; no repercussions could result in auto win)
		this.streetwise = 0; // adds an overall luck boost to all stats (potential advantage rolls, no repercussions)
		// base
		this.isTurn = false;
		this.didStand = false;
		this.isBust = false;
		this.isPlayerOne = false; // just to remember who went first in the game!!
		this.playedCardThisRound = false;
		this.roundScore = 0;
		this.roundWins = 0;
		this.valuesInPlay =  [];
		this.sideDeck = [];
		this.sideDeckInPlay = [];
		this.gameWins = 0;
		this.gameLosses = 0;
		this.drawSpace = [
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
			{ card: {}, hasCard: false},
		];
		this.setStat = function (stat, value) {
			if(stat in this) {
				this[stat] = value;
			}
		}
	}
}