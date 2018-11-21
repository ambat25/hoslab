import axios from 'axios';
import { RESULTS_URL } from '../variables/api';

export default {
	allResults: async () => {
		try {
			const allTests = await axios.get(RESULTS_URL);
			return allTests.data;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	addResult: async (test) => {
		try {
			console.log(test);
			const newResult = await axios.post(RESULTS_URL, test);
			return newResult.data;
		} catch (error) {
			throw new Error(error.response);
		}
	}
};
