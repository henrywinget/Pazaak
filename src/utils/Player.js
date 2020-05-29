export default class Player {
	constructor(isUser) {
		this.isUser = isUser;
		
		// to implement a more RPG style
		this.cool = 0; // used to determine who goes first (no repercussions)
		this.coercion = 0; // used to bait the opponent into holding out for one more card when they would otherwise stand (no repercussions)
		this.deception = 0; // used to attempt to get out of repercussions if caught cheating to avoid loss stat and money loss
		this.negotiation = 0; // used to negotiate higher bids and bribe if caught cheating to avoid a loss stat
		this.charm = 0; // used to negotiate higher bids, bait the opponent, attempt to get out of repercussions if caught cheating with opposite sex
		this.skulduggery = 0; // used to cheat to pick up an extra side card (failure could mean auto loss)
		this.computers = 0; // used to cheat to trick the computer to dealing the card you need (could lead to less than desirable card and multiple failures could mean auto loss)
		this.perception = 0; // used to tell if the opponent is cheating (passive; no repercussions could result in auto win)
		this.streetwise = 0; // adds an overall luck boost to all stats (potential advantage rolls, no repercussions)
		// base
		this.roundWins = 0;
		this.valuesInPlay =  [];
		this.sideDeck = [];
		this.gameWins = 0;
		this.gameLosses = 0;
	}
	
	hasWon() {
		return this.roundWins >= 3;
	}
	
	determineScore() {
		let value = 0;
		this.valuesInPlay.forEach(val => value += val);
		return value;
	}
}