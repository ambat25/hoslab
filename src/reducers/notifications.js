const SHOW_MESSAGE = 'SHOW_MESSAGE';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const showMessage = (message, type) => ({ type: SHOW_MESSAGE, payload: { message, type } });
export const clearMessage = () => ({ type: CLEAR_MESSAGE, payload: null });

const initialState = {
	message: null,
	type: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MESSAGE:
			return { ...action.payload };
		case CLEAR_MESSAGE:
			return { ...initialState };
		default:
			return state;
	}
};
