import resultsService from '../lib/results';
import { showMessage } from './notifications';
import { removeTest } from './lab_test';

const FETCH_RESULTS = 'FETCH_RESULTS';
const ADD_RESULT = 'ADD_RESULT';
const GET_RESULT = 'GET_RESULT';
const TOGGLE_ADD_RESULT_MODAL = 'TOGGLE_ADD_RESULT_MODAL';
const UPDATE_CURRENT_RESULT_ADD = 'UPDATE_CURRENT_RESULT_ADD';

export const allResults = (results) => ({ type: FETCH_RESULTS, payload: results });
export const addResult = (result) => ({ type: ADD_RESULT, payload: result });
export const getResult = (id) => ({ type: GET_RESULT, payload: id });
export const toggleAddResultModal = (open) => ({ type: TOGGLE_ADD_RESULT_MODAL, payload: open });
export const updateCurrentResult = (data) => ({ type: UPDATE_CURRENT_RESULT_ADD, payload: data });

export const getResults = () => {
	return (dispatch) => {
		resultsService
			.allResults()
			.then((res) => {
				dispatch(allResults(res));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const postResult = (result) => {
	return (dispatch) => {
		resultsService
			.addResult(result)
			.then((newResult) => {
				dispatch(addResult(newResult));
				dispatch(removeTest(newResult._id));
				dispatch(showMessage('Result added successfully', 'success'));
				dispatch(toggleAddResultModal(false));
			})
			.catch((error) => {
				console.error(error.message);
			});
	};
};

const initialState = {
	results: [],
	add_result_modal: false,
	current_result: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_RESULTS:
			return { ...state, results: action.payload };
		case ADD_RESULT:
			return {
				...state,
				results: [ action.payload, ...state.results ],
				current_result: initialState.current_result
			};
		case GET_RESULT:
			return {
				...state,
				current_result: state.results.find((result) => result._id === action.payload) || []
			};
		case TOGGLE_ADD_RESULT_MODAL:
			return { ...state, add_result_modal: action.payload, current_result: initialState.current_result };
		case UPDATE_CURRENT_RESULT_ADD:
			return { ...state, current_result: [ ...state.current_result, action.payload ] };
		default:
			return state;
	}
};
