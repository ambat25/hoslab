import axios from 'axios';
import { ALL_DOCTORS_URL } from '../variables/api';

export default {
	allDoctors: async () => {
		try {
			const allDoctors = await axios.get(ALL_DOCTORS_URL);
			return allDoctors.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	addDoctor: async (doctor) => {
		try {
			const newDoctor = await axios.post(ALL_DOCTORS_URL, doctor);
			return newDoctor.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	getDoctorDetails: async (id) => {
		try {
			const doctor = await axios.get(`${ALL_DOCTORS_URL}/${id}`);
			return doctor.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	updateDoctor: async (doctor) => {
		try {
			console.log({ doctor });
			const updatedDoctor = await axios.put(`${ALL_DOCTORS_URL}/${doctor._id}`, doctor);
			console.log({ updatedDoctor: updatedDoctor.data });
			return updatedDoctor.data;
		} catch (error) {
			console.log(error.response.data);
			throw new Error(error.response.data);
		}
	}
};
