import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { connect } from 'react-redux';

class Dashboard extends Component {
	render() {
		const { totalTests, totalResults, totalDoctors, totalPatients } = this.props;
		return (
			<div className="content">
				<Grid fluid>
					<Row>
						<Col lg={3} sm={6}>
							<StatsCard
								bigIcon={<i className="fa fa-flask text-warning" />}
								statsText={<span>Tests</span>}
								statsValue={totalTests}
								statsIcon={<i className="fa fa-refresh" />}
								statsIconText="Updated now"
							/>
						</Col>
						<Col lg={3} sm={6}>
							<StatsCard
								bigIcon={<i className="pe-7s-wallet text-success" />}
								statsText={<span>Results</span>}
								statsValue={totalResults}
								statsIcon={<i className="fa fa-calendar-o" />}
								statsIconText="update"
							/>
						</Col>
						<Col lg={3} sm={6}>
							<StatsCard
								bigIcon={<i className="fa fa-user-md text-danger" />}
								statsText="Total Doctors"
								statsValue={totalDoctors}
								statsIcon={<i className="fa fa-clock-o" />}
								statsIconText="In the last hour"
							/>
						</Col>
						<Col lg={3} sm={6}>
							<StatsCard
								bigIcon={<i className="fa fa-bed text-info" />}
								statsText="Total Patients"
								statsValue={totalPatients}
								statsIcon={<i className="fa fa-refresh" />}
								statsIconText="Updated now"
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default connect((state) => ({
	totalDoctors: state.doctorReducer.doctors.length,
	totalTests: state.testReducer.tests.length,
	totalPatients: state.patientReducer.patients.length,
	totalResults: state.resultReducer.results.length
}))(Dashboard);
