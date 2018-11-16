import patientService from '../lib/patients';
import { showMessage } from './notifications';

const FETCH_PATIENTS = 'FETCH_PATIENTS';
const ADD_PATIENT = 'ADD_PATIENT';
const SINGLE_PATIENT = 'SINGLE_PATIENT';
const TOGGLE_ADD_PATIENT_MODAL = 'TOGGLE_ADD_PATIENT_MODAL';
const TOGGLE_EDIT_PATIENT = 'TOGGLE_EDIT_PATIENT';
const UPDATE_CURRENT = 'UPDATE_CURRENT';
const UPDATE_CURRENT_PATIENT = 'UPDATE_CURRENT_PATIENT';
const UPDATE_CURRENT_DETAILS = 'UPDATE_CURRENT_DETAILS';
const UPDATE_NEW_PATIENT = 'UPDATE_NEW_PATIENT';

export const allPatients = (patients) => ({ type: FETCH_PATIENTS, payload: patients });
export const addPatient = (patient) => ({ type: ADD_PATIENT, payload: patient });
export const getSinglePatient = (id) => ({ type: SINGLE_PATIENT, payload: id });
export const togglAddPatientModal = (open) => ({ type: TOGGLE_ADD_PATIENT_MODAL, payload: open });
export const togglEditPatient = (edit) => ({ type: TOGGLE_EDIT_PATIENT, payload: edit });
export const updateCurrentPatient = (value) => ({ type: UPDATE_CURRENT, payload: value });
export const updateNewPatient = (data) => ({ type: UPDATE_NEW_PATIENT, payload: data });
export const updatePatientDetails = (value) => ({ type: UPDATE_CURRENT_PATIENT, payload: value });
export const currentPatientDetails = (patient) => ({ type: UPDATE_CURRENT_DETAILS, payload: patient });

export const getPatients = () => {
	return (dispatch) => {
		patientService
			.allPatients()
			.then((res) => {
				dispatch(allPatients(res));
			})
			.catch((err) => {
				// TODO: send an error to user
			});
	};
};

export const postPatient = (patient) => {
	return (dispatch) => {
		patientService
			.addPatient(patient)
			.then((newPatient) => {
				dispatch(addPatient(newPatient));
				dispatch(showMessage('Patient added successfully', 'success'));
			})
			.catch((err) => {
				dispatch(showMessage(err.message, 'danger'));
				// TODO: send an error to user
			});
	};
};

export const updatePatient = (patient) => {
	return (dispatch) => {
		patientService
			.updatePatient(patient)
			.then((updatedPatient) => {
				dispatch(updatePatientDetails(updatedPatient));
				dispatch(togglEditPatient(false));
				dispatch(showMessage('Patient details updated successfully', 'success'));
			})
			.catch((err) => {
				dispatch(showMessage(err.message, 'error'));
				// TODO: send an error to user
			});
	};
};

export const getPatientDetails = (id) => {
	return (dispatch) => {
		patientService
			.getPatientDetails(id)
			.then((patient) => {
				dispatch(currentPatientDetails(patient));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

const initialState = {
	add_patient_modal: false,
	new_patient: {
		name: '',
		phone: '',
		age: '',
		gender: '',
		address: ''
	},
	edit_patient: false,
	current_patient: {},
	patients: [],
	message: {
		visible: true,
		text: 'hello from me'
	}
};
export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PATIENTS:
			return { ...state, patients: action.payload };
		case ADD_PATIENT:
			return { ...state, patients: [ ...state.patients, action.payload ] };
		case TOGGLE_ADD_PATIENT_MODAL:
			return { ...state, add_patient_modal: action.payload, new_patient: initialState.new_patient };
		case SINGLE_PATIENT:
			return { ...state, current_patient: state.patients.find((patient) => patient._id === action.payload) };
		case UPDATE_CURRENT:
			return { ...state, current_patient: { ...state.current_patient, ...action.payload } };
		case TOGGLE_EDIT_PATIENT:
			return { ...state, edit_patient: action.payload };
		case UPDATE_NEW_PATIENT:
			return { ...state, new_patient: { ...state.new_patient, ...action.payload } };
		case UPDATE_CURRENT_PATIENT:
			return {
				...state,
				current_patient: { ...state.current_patient, ...action.payload },
				patients: state.patients.map(
					(patient) => (patient._id === action.payload._id ? action.payload : patient)
				)
			};
		case UPDATE_CURRENT_DETAILS:
			return { ...state, current_patient: action.payload };
		default:
			return state;
	}
};
