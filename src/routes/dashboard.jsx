import Dashboard from 'views/Dashboard/Dashboard';
import Results from 'views/Results';
import Doctor from 'views/Doctor';
import Doctors from 'views/Doctors';
import Patients from 'views/Patients';
import Patient from 'views/Patient';
import Lab_Test from 'views/Lab_Test';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'pe-7s-graph',
		sidebar: true,
		component: Dashboard
	},
	{
		path: '/tests',
		name: 'Lab_Test',
		icon: 'fa fa-flask',
		sidebar: true,
		component: Lab_Test
	},
	{
		path: '/results',
		name: 'Results',
		icon: 'fa fa-list-alt',
		sidebar: true,
		component: Results
	},
	{
		path: '/doctors/:id',
		name: 'Doctor',
		component: Doctor
	},
	{
		path: '/doctors',
		name: 'Doctors',
		icon: 'pe-7s-id',
		sidebar: true,
		component: Doctors
	},
	{
		path: '/patients/:id',
		name: 'Patient',
		component: Patient
	},
	{
		path: '/patients',
		name: 'Patients',
		icon: 'pe-7s-users',
		sidebar: true,
		component: Patients
	},
	{ redirect: true, path: '/', to: '/dashboard', name: 'Dashboard' }
];

export default dashboardRoutes;
