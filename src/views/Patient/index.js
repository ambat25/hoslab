import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
	getSinglePatient,
	updateCurrentPatient,
	updatePatient,
	getPatientDetails,
	togglEditPatient
} from '../../reducers/patients';
import { clearMessage } from '../../reducers/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

class PatientProfile extends Component {
	componentWillMount() {
		this.props.getPatientDetails(this.props.match.params.id);
	}
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.message) {
			const { message, messageType, clearMessage } = this.props;
			messageType === 'success' ? toast.success(message) : toast.error(message);
			clearMessage();
		}
	};

	handleEditSubmit = (e) => {
		e.preventDefault();
		this.props.togglEditPatient(true);
		this.props.updatePatient(this.props.patient);
	};

	handleEditPatientName = (e) => {
		this.props.updateCurrentPatient({ name: e.target.value });
	};

	handleEditPatientPhone = (e) => {
		this.props.updateCurrentPatient({ phone: e.target.value });
	};

	handleEditPatientAge = (e) => {
		this.props.updateCurrentPatient({ age: e.target.value });
	};

	handleEditPatientGender = (e) => {
		this.props.updateCurrentPatient({ gender: e.target.value });
	};

	handleEditPatientAddress = (e) => {
		this.props.updateCurrentPatient({ address: e.target.value });
	};

	render() {
		return (
			<div className="content">
				<Breadcrumb>
					<Breadcrumb.Item componentClass="span">
						<Link to="/">
							<i className="fa fa-home" /> Home
						</Link>
					</Breadcrumb.Item>

					<Breadcrumb.Item componentClass="span">
						<Link to="/patients">Patients</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item active>{this.props.patient.name}</Breadcrumb.Item>
				</Breadcrumb>
				<ToastContainer />
				<Grid fluid>
					<Row>
						<Col md={12}>
							{Object.keys(this.props.patient).length ? (
								<Card
									title={`${this.props.patient.name.toString().toUpperCase()} (patient)`}
									content={
										<div>
											<div>
												<Button
													bsStyle="success"
													fill
													pullRight
													onClick={() =>
														this.props.togglEditPatient(!this.props.edit_patient)}
												>
													<i className="fa fa-pencil" />
												</Button>
												<div className="clearfix" />
											</div>
											<form onSubmit={this.handleEditSubmit}>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Name</ControlLabel>
													<FormControl
														disabled={!this.props.edit_patient}
														value={this.props.patient.name}
														onChange={this.handleEditPatientName}
													/>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Phone</ControlLabel>
													<FormControl
														disabled={!this.props.edit_patient}
														value={this.props.patient.phone}
														onChange={this.handleEditPatientPhone}
													/>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Age</ControlLabel>
													<FormControl
														disabled={!this.props.edit_patient}
														value={this.props.patient.age}
														onChange={this.handleEditPatientAge}
													/>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Gender</ControlLabel>
													<FormControl
														componentClass="select"
														disabled={!this.props.edit_patient}
														value={this.props.patient.gender}
														onChange={this.handleEditPatientGender}
													>
														<option value="">select</option>
														<option value="male">Male</option>
														<option value="female">female</option>
													</FormControl>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Address</ControlLabel>
													<FormControl
														componentClass="textarea"
														placeholder="Address"
														style={{ height: 100 }}
														disabled={!this.props.edit_patient}
														value={this.props.patient.address}
														onChange={this.handleEditPatientAddress}
													/>
												</FormGroup>
												{this.props.edit_patient ? (
													<Button bsStyle="info" pullRight fill type="submit">
														Save
													</Button>
												) : null}
												<div className="clearfix" />
											</form>
										</div>
									}
								/>
							) : null}
							<Card
								title="Patient Record"
								content={
									<div>
										<h2>Lab tests count</h2>
									</div>
								}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		patientsExist: state.patientReducer.patients.length !== 0,
		patient: state.patientReducer.current_patient,
		edit_patient: state.patientReducer.edit_patient,
		message: state.notificationReducer.message,
		messageType: state.notificationReducer.type
	}),
	{ getSinglePatient, updateCurrentPatient, updatePatient, getPatientDetails, clearMessage, togglEditPatient }
)(PatientProfile);
