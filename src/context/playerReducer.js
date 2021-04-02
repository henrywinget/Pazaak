export const CHANGE_NAME = "CHANGE_NAME";
export const SET_PLAYER = "SET_PLAYER";

export const changeName = (name, state) => {
	return {
		...state,
		name,
	}
};

export const setPlayer = (player, state) => {
	return {
		...state,
		...player,
		isUser: true,
	}
};

export const playerReducer = (state, action) => {
	console.log(action)
	switch(action.type) {
		case SET_PLAYER:
			return setPlayer(action.player, state);
		case CHANGE_NAME:
			return changeName(action.name, state);
		default:
			return state;
	}
};