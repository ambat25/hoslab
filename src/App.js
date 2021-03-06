import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTests } from './reducers/lab_test';
import { getDoctors } from './reducers/doctors';
import { getPatients } from './reducers/patients';
import { getResults } from './reducers/results';
import { HashRouter, Route, Switch } from 'react-router-dom';

import indexRoutes from './routes/index.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/light-bootstrap-dashboard.css?v=1.2.0';
import './assets/css/main.css';
import './assets/css/pe-icon-7-stroke.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	componentWillMount = () => {
		this.props.getTests();
		this.props.getDoctors();
		this.props.getPatients();
		this.props.getResults();
	};

	render() {
		return (
			<HashRouter>
				<Switch>
					{indexRoutes.map((prop, key) => {
						return <Route to={prop.path} component={prop.component} key={key} />;
					})}
				</Switch>
			</HashRouter>
		);
	}
}

// export default App;
export default connect(null, { getTests, getDoctors, getPatients, getResults })(App);
