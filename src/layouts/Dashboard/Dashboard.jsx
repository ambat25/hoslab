import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';

import { ToastContainer } from 'react-toastify';
// import { style } from 'variables/Variables.jsx';

import dashboardRoutes from 'routes/dashboard.jsx';

class Dashboard extends Component {
	render() {
		return (
			<div className="wrapper">
				<Sidebar {...this.props} />
				<div id="main-panel" className="main-panel" ref="mainPanel">
					<Header {...this.props} />
					<ToastContainer />
					<Switch>
						{dashboardRoutes.map((prop, key) => {
							if (prop.name === 'Notifications')
								return (
									<Route
										path={prop.path}
										key={key}
										render={(routeProps) => (
											<prop.component
												{...routeProps}
												handleClick={this.handleNotificationClick}
											/>
										)}
									/>
								);
							if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;
							return <Route path={prop.path} component={prop.component} key={key} />;
						})}
					</Switch>
				</div>
			</div>
		);
	}
}

export default Dashboard;
