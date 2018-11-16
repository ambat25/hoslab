import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, Modal } from 'react-bootstrap';
import { getTests, getTest, toggleAddTestModal, updateCurrentTest, postTest } from '../../reducers/lab_test';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { clearMessage } from '../../reducers/notifications';
import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

class LabTest extends Component {
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.message) {
			const { message, messageType, clearMessage } = this.props;
			messageType === 'success' ? toast.success(message) : toast.error(message);
			clearMessage();
		}
	};
	handleSelectTests = (selectedOption) => {
		this.props.updateCurrentTest({ tests: selectedOption });
	};
	handleDoctor = (doctor) => {
		this.props.updateCurrentTest({ doctor });
	};
	handlePatient = (patient) => {
		this.props.updateCurrentTest({ patient });
	};
	handleCloseModal = () => {
		this.props.toggleAddTestModal(false);
	};
	handleSave = () => {
		this.props.postTest(this.props.current_test);
		// this.props.toggleAddTestModal(false);
	};
	render() {
		return (
			<div className="content">
				<Grid fluid>
					<Row>
						<Col md={12}>
							<Card
								title={
									<div>
										<span>Lab Test</span>
										<Button
											pullRight
											bsStyle="primary"
											onClick={() => this.props.toggleAddTestModal(true)}
										>
											New
										</Button>
										<div className="clearfix" />
									</div>
								}
								content={
									<div>
										<Grid>
											{this.props.tests.map((test) => (
												<LabCard
													key={test._id}
													patient={test.patient.name}
													testId={test._id}
													doctor={test.doctor.name}
												/>
											))}
										</Grid>
										<Modal
											show={this.props.add_test_modal}
											container={this}
											onHide={this.handleCloseModal}
											aria-labelledby="contained-modal-title"
										>
											<Modal.Header closeButton>
												<Modal.Title id="contained-modal-title">New Test</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<Grid fluid>
													<Form>
														<Row>
															<Col sm={6}>
																<FormGroup>
																	<ControlLabel> Patient Id </ControlLabel>
																	<Select
																		value={this.props.current_test.patient}
																		onChange={this.handlePatient}
																		options={this.props.patients}
																	/>
																</FormGroup>
															</Col>
															<Col sm={6}>
																<FormGroup>
																	<ControlLabel> Doctor Id </ControlLabel>
																	<Select
																		value={this.props.current_test.doctor}
																		onChange={this.handleDoctor}
																		options={this.props.doctors}
																	/>
																</FormGroup>
															</Col>
															<Col sm={6}>
																<FormGroup controlId="formControlsSelectMultiple">
																	<ControlLabel>Select Test(s)</ControlLabel>
																	<Select
																		value={this.props.current_test.tests}
																		onChange={this.handleSelectTests}
																		isMulti
																		options={this.props.test_types}
																	/>
																</FormGroup>
															</Col>
														</Row>
													</Form>
												</Grid>
											</Modal.Body>
											<Modal.Footer>
												<Button bsStyle="success" onClick={this.handleSave}>
													<i className="fa fa-check" />Save
												</Button>
												<Button bsStyle="primary" onClick={this.handleCloseModal}>
													Close
												</Button>
											</Modal.Footer>
										</Modal>
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

function LabCard({ testId, patient, doctor }) {
	return (
		<Col md={4} sm={6}>
			<div className="lab-card">
				<h4>
					Test ID : <small>{testId}</small>
				</h4>
				<div>
					<p>
						Patient : <b>{patient}</b>
					</p>
					<p>
						Doctor : <b>{doctor}</b>
					</p>
					<p>Date : {new Date().toDateString()}</p>
					<Button pullRight bsStyle="warning" bsSize="sm" fill>
						Add Result
					</Button>
					<div className="clearfix" />
				</div>
			</div>
		</Col>
	);
}

export default connect(
	(state) => ({
		tests: state.testReducer.tests,
		add_test_modal: state.testReducer.add_test_modal,
		test_types: state.testReducer.test_types,
		current_test: state.testReducer.current_test,
		patients: state.patientReducer.patients.map((patient) => ({
			value: patient._id,
			label: patient.name,
			id: patient._id,
			name: patient.name
		})),
		doctors: state.doctorReducer.doctors.map((doctor) => ({
			value: doctor._id,
			label: doctor.name,
			id: doctor._id,
			name: doctor.name
		})),
		message: state.notificationReducer.message,
		messageType: state.notificationReducer.type
	}),
	{ getTests, getTest, toggleAddTestModal, updateCurrentTest, postTest, clearMessage }
)(LabTest);
