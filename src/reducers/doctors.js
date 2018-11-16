import doctorService from '../lib/doctors';
import { showMessage } from './notifications';

const FETCH_DOCTORS = 'FETCH_DOCTORS';
const ADD_DOCTOR = 'ADD_DOCTOR';
const OPEN_ADD_DOCTOR = 'OPEN_ADD_DOCTOR';
const TOGGLE_EDIT_DOCTOR = 'TOGGLE_EDIT_DOCTOR';
const SINGLE_DOCTOR = 'SINGLE_DOCTOR';
const UPDATE_NEW_DOCTOR = 'UPDATE_NEW_DOCTOR';
const UPDATE_CURRENT_DOCTOR = 'UPDATE_CURRENT';
const UPDATE_CURRENT_DOCTOR_DETAILS = 'UPDATE_CURRENT_DOCTOR_DETAILS';

export const allDoctors = (doctors) => ({ type: FETCH_DOCTORS, payload: doctors });
export const addDoctor = (doctor) => ({ type: ADD_DOCTOR, payload: doctor });
export const togglAddDoctorModal = (open) => ({ type: OPEN_ADD_DOCTOR, payload: open });
export const getSingleDoctor = (id) => ({ type: SINGLE_DOCTOR, payload: id });
export const togglEditDoctor = (edit) => ({ type: TOGGLE_EDIT_DOCTOR, payload: edit });
export const currentDoctorDetails = (doctor) => ({ type: UPDATE_CURRENT_DOCTOR_DETAILS, payload: doctor });
export const updateNewDoctor = (data) => ({ type: UPDATE_NEW_DOCTOR, payload: data });
export const updateCurrentDoctor = (value) => ({ type: UPDATE_CURRENT_DOCTOR, payload: value });
export const updateDoctorDetails = (value) => ({ type: UPDATE_CURRENT_DOCTOR, payload: value });

export const getDoctors = () => {
	return (dispatch) => {
		doctorService
			.allDoctors()
			.then((res) => {
				dispatch(allDoctors(res));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const postDoctor = (doctor) => {
	return (dispatch) => {
		doctorService
			.addDoctor(doctor)
			.then((newDoctor) => {
				dispatch(addDoctor(newDoctor));
				dispatch(showMessage('User updated successfully', 'success'));
				dispatch(togglAddDoctorModal(false));
			})
			.catch((error) => {
				console.error(error);
			});
	};
};

export const updateDoctor = (patient) => {
	return (dispatch) => {
		doctorService
			.updateDoctor(patient)
			.then((updatedDoctor) => {
				dispatch(currentDoctorDetails(updatedDoctor));
				dispatch(showMessage('User updated successfully', 'success'));
				dispatch(togglEditDoctor(false));
			})
			.catch((err) => {
				// TODO: send an error to user
			});
	};
};

export const getDoctorDetails = (id) => {
	return (dispatch) => {
		doctorService
			.getDoctorDetails(id)
			.then((doctor) => {
				dispatch(currentDoctorDetails(doctor));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

const initialState = {
	add_doctor_modal: false,
	new_doctor: {
		name: '',
		phone: '',
		age: '',
		gender: '',
		speciality: ''
	},
	edit_doctor: false,
	current_doctor: {},
	doctors: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DOCTORS:
			return { ...state, doctors: action.payload };
		case ADD_DOCTOR:
			return { ...state, doctors: [ ...state.doctors, action.payload ] };
		case OPEN_ADD_DOCTOR:
			return { ...state, add_doctor_modal: action.payload, new_doctor: initialState.new_doctor };
		case SINGLE_DOCTOR:
			return { ...state, current_doctor: state.doctors.find((doctor) => doctor._id === action.payload) };
		case TOGGLE_EDIT_DOCTOR:
			return { ...state, edit_doctor: action.payload };
		case UPDATE_NEW_DOCTOR:
			return { ...state, new_doctor: { ...state.new_doctor, ...action.payload } };
		case UPDATE_CURRENT_DOCTOR:
			return { ...state, current_doctor: { ...state.current_doctor, ...action.payload } };
		case UPDATE_CURRENT_DOCTOR_DETAILS:
			return { ...state, current_doctor: action.payload };
		default:
			return state;
	}
};
