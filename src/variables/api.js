const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3123';

export const ALL_PATIENTS_URL = `${API_URL}/api/patients`;
export const PATIENT_URL = `${API_URL}/api/patient`;
export const LAB_TEST_URL = `${API_URL}/api/tests`;
export const ALL_DOCTORS_URL = `${API_URL}/api/doctors`;
export const RESULTS_URL = `${API_URL}/api/results`;
