import axios from 'axios';
import { ALL_PATIENTS_URL } from '../variables/api';

export default {
	allPatients: async () => {
		try {
			const allPatients = await axios.get(ALL_PATIENTS_URL);
			return allPatients.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	addPatient: async (patient) => {
		try {
			const newPatient = await axios.post(ALL_PATIENTS_URL, patient);
			return newPatient.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	updatePatient: async (patient) => {
		try {
			const updatedPatient = await axios.put(`${ALL_PATIENTS_URL}/${patient._id}`, patient);
			return updatedPatient.data;
		} catch (error) {
			throw new Error(error.response.data);
		}
	},
	getPatientDetails: async (id) => {
		try {
			const doctor = await axios.get(`${ALL_PATIENTS_URL}/${id}`);
			return doctor.data;
		} catch (error) {
			throw new Error(error.message);
		}
	}
};
