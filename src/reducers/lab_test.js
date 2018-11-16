import labTestService from '../lib/lab_test';
import { showMessage } from './notifications';

const FETCH_TESTS = 'FETCH_TESTS';
const ADD_TEST = 'ADD_TEST';
const GET_TEST = 'GET_TEST';
const TOGGLE_ADD_TEST_MODAL = 'TOGGLE_ADD_TEST_MODAL';
const UPDATE_CURRENT_TEST = 'UPDATE_CURRENT_TEST';

export const allTests = (tests) => ({ type: FETCH_TESTS, payload: tests });
export const addTest = (test) => ({ type: ADD_TEST, payload: test });
export const getTest = (id) => ({ type: GET_TEST, payload: id });
export const toggleAddTestModal = (open) => ({ type: TOGGLE_ADD_TEST_MODAL, payload: open });
export const updateCurrentTest = (data) => ({ type: UPDATE_CURRENT_TEST, payload: data });

export const getTests = () => {
	return (dispatch) => {
		labTestService
			.allTests()
			.then((res) => {
				dispatch(allTests(res));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const postTest = (test) => {
	return (dispatch) => {
		labTestService
			.addTest(test)
			.then((newTest) => {
				dispatch(addTest(newTest));
				dispatch(showMessage('Test added successfully', 'success'));
				dispatch(toggleAddTestModal(false));
			})
			.catch((error) => {
				console.error(error.message);
			});
	};
};

const initialState = {
	add_test_modal: false,
	current_test: {
		doctor: '',
		patient: '',
		tests: []
	},
	tests: [],
	test_types: [
		{ value: 'typhoid', label: 'Typhoid', another: 'another one' },
		{ value: 'malaria', label: 'Malaria' },
		{ value: 'athsma', label: 'Athsma' },
		{ value: 'athsma', label: 'Athsma' }
	]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TESTS:
			return { ...state, tests: action.payload };
		case ADD_TEST:
			return { ...state, tests: [ action.payload, ...state.tests ], current_test: initialState.current_test };
		case GET_TEST:
			return { ...state, current_test: state.tests.find((test) => test._id === action.payload) || {} };
		case TOGGLE_ADD_TEST_MODAL:
			return { ...state, add_test_modal: action.payload, current_test: initialState.current_test };
		case UPDATE_CURRENT_TEST:
			return { ...state, current_test: { ...state.current_test, ...action.payload } };
		default:
			return state;
	}
};
