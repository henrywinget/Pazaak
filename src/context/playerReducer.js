export const CHANGE_NAME = "CHANGE_NAME";

export const changeName = (name, state) => {
	return {
		...state,
		name,
	}
};

export const playerReducer = (state, action) => {
	switch(action.type) {
		case CHANGE_NAME:
			return changeName(action.name, state);
		default:
			return state;
	}
};