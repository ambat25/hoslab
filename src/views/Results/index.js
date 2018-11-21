import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table } from 'react-bootstrap';

class Results extends Component {
	render() {
		return (
			<div className="content">
				<Grid>
					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>#</th>
								{/* <th>Test Id</th> */}
								<th>Patient</th>
								<th>Doctor</th>
								<th>Tests</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{this.props.results.map((result, index) => (
								<tr key={result._id}>
									<td>{index + 1}</td>
									{/* <td>{result._id}</td> */}
									<td>{result.patient.name}</td>
									<td>{result.doctor.name}</td>
									<td>{result.tests.map((test) => test.name).join(', ')}</td>
									<td>{new Date(result._id).toDateString()}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Grid>
			</div>
		);
	}
}

export default connect((state) => ({
	results: state.resultReducer.results
}))(Results);
