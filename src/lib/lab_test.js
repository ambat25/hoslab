import axios from 'axios';
import { LAB_TEST_URL } from '../variables/api';

export default {
	allTests: async () => {
		try {
			const allTests = await axios.get(LAB_TEST_URL);
			return allTests.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	addTest: async (test) => {
		try {
			delete test.doctor.value;
			delete test.doctor.label;
			delete test.patient.value;
			delete test.patient.label;
			const newTest = await axios.post(LAB_TEST_URL, test);
			return newTest.data;
		} catch (error) {
			throw new Error(error.response);
		}
	},
	getTestDetails: async (id) => {
		try {
			const test = await axios.get(`${LAB_TEST_URL}/${id}`);
			return test.data;
		} catch (error) {
			throw new Error(error.message);
		}
	}
};
