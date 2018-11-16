import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, Table, FormControl, Modal } from 'react-bootstrap';
import { getPatients, postPatient, togglAddPatientModal, updateNewPatient } from '../../reducers/patients';
import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearMessage } from '../../reducers/notifications';

class UserProfile extends Component {
	state = {
		name: '',
		phone: '',
		age: '',
		gender: '',
		address: ''
	};

	closeModal = () => {
		this.props.togglAddPatientModal(false);
	};

	savePatient = () => {
		const newPatient = this.props.new_patient;
		this.props.postPatient(newPatient);
		this.closeModal();
	};

	openModal = () => {
		this.props.togglAddPatientModal(true);
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.message) {
			const { message, messageType, clearMessage } = this.props;
			messageType === 'success' ? toast.success(message) : toast.error(message);
			clearMessage();
		}
	};

	componentWillMount() {
		this.props.getPatients();
	}

	render() {
		return (
			<div className="content">
				<Grid fluid>
					<Row>
						<Col md={12}>
							<Card
								title={
									<div>
										<span>Patients List</span>
										<Button pullRight bsStyle="primary" onClick={this.openModal}>
											New
										</Button>
										<div className="clearfix" />
									</div>
								}
								content={
									<div>
										<Table responsive striped bordered condensed hover>
											<thead>
												<tr>
													<th>#</th>
													<th>Name</th>
													<th>Phone</th>
													<th>Address</th>
												</tr>
											</thead>
											<tbody>
												{this.props.patients.map((objPatient, index) => (
													<tr key={objPatient._id}>
														<td>{index + 1}</td>
														<td>
															<Link to={`/patients/${objPatient._id}`}>
																{objPatient.name}
															</Link>
														</td>
														<td>{objPatient.phone}</td>
														<td>{objPatient.address}</td>
													</tr>
												))}
											</tbody>
										</Table>

										<Modal
											show={this.props.add_patient_modal}
											container={this}
											onHide={this.closeModal}
											aria-labelledby="contained-modal-title"
										>
											<Modal.Header closeButton>
												<Modal.Title id="contained-modal-title">New Patient</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<Grid fluid>
													<Form>
														<Row>
															<Col sm={6}>
																<FormGroup>
																	<ControlLabel> Name </ControlLabel>
																	<FormControl
																		placeholder="Aliyu Ilyasu"
																		value={this.props.new_patient.name}
																		onChange={(e) =>
																			this.props.updateNewPatient({
																				name: e.target.value
																			})}
																	/>
																</FormGroup>
															</Col>
															<Col sm={6}>
																<FormGroup>
																	<ControlLabel> Phone </ControlLabel>
																	<FormControl
																		type="phone"
																		required={true}
																		value={this.props.new_patient.phone}
																		maxLength={11}
																		onChange={(e) =>
																			this.props.updateNewPatient({
																				phone: e.target.value
																			})}
																		placeholder="080xxxxxxxx"
																	/>
																</FormGroup>
															</Col>
															<Col sm={6}>
																<FormGroup>
																	<ControlLabel> Age </ControlLabel>
																	<FormControl
																		type="number"
																		required={true}
																		placeholder="15"
																		min={1}
																		max={200}
																		value={this.props.new_patient.age}
																		onChange={(e) =>
																			this.props.updateNewPatient({
																				age: e.target.value
																			})}
																	/>
																</FormGroup>
															</Col>
															<Col sm={6}>
																<FormGroup controlId="formControlsSelect">
																	<ControlLabel>Gender</ControlLabel>
																	<FormControl
																		componentClass="select"
																		placeholder="select"
																		value={this.props.new_patient.gender}
																		onChange={(e) =>
																			this.props.updateNewPatient({
																				gender: e.target.value
																			})}
																	>
																		<option value="">select</option>
																		<option value="male">Male</option>
																		<option value="female">female</option>
																	</FormControl>
																</FormGroup>
															</Col>
															<Col sm={6}>
																<FormGroup controlId="formControlsTextarea">
																	<ControlLabel>Address</ControlLabel>
																	<FormControl
																		componentClass="textarea"
																		placeholder="Address"
																		style={{ height: 100 }}
																		value={this.props.new_patient.address}
																		onChange={(e) =>
																			this.props.updateNewPatient({
																				address: e.target.value
																			})}
																	/>
																</FormGroup>
															</Col>
														</Row>
													</Form>
												</Grid>
											</Modal.Body>
											<Modal.Footer>
												<Button bsStyle="success" onClick={this.savePatient}>
													<i className="fa fa-check" />Save
												</Button>
												<Button bsStyle="primary" onClick={this.closeModal}>
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

export default connect(
	(state) => ({
		patients: state.patientReducer.patients,
		new_patient: state.patientReducer.new_patient,
		add_patient_modal: state.patientReducer.add_patient_modal,
		message: state.notificationReducer.message,
		messageType: state.notificationReducer.type
	}),
	{ getPatients, postPatient, togglAddPatientModal, updateNewPatient, clearMessage }
)(UserProfile);
