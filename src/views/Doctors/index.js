import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, Table, FormControl, Modal } from 'react-bootstrap';
import { getDoctors, postDoctor, togglAddDoctorModal, updateNewDoctor } from '../../reducers/doctors';
import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import { clearMessage } from '../../reducers/notifications';
import { toast } from 'react-toastify';

class Doctors extends Component {
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.message) {
			const { message, messageType, clearMessage } = this.props;
			messageType === 'success' ? toast.success(message) : toast.error(message);
			clearMessage();
		}
	};

	closeModal = () => {
		this.props.togglAddDoctorModal(false);
	};

	saveDoctor = () => {
		const newDoctor = this.props.new_doctor;
		this.props.postDoctor(newDoctor);
	};

	openModal = () => {
		this.props.togglAddDoctorModal(true);
	};

	componentWillMount() {
		this.props.getDoctors();
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
										<span>Doctors List</span>
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
												{this.props.doctors.map((objDoctor, index) => (
													<tr key={objDoctor._id}>
														<td>{index + 1}</td>
														<td>
															<Link to={`/doctors/${objDoctor._id}`}>
																{objDoctor.name}
															</Link>
														</td>
														<td>{objDoctor.phone}</td>
														<td>{objDoctor.speciality}</td>
													</tr>
												))}
											</tbody>
										</Table>

										<Modal
											show={this.props.add_doctor_modal}
											container={this}
											onHide={this.closeModal}
											aria-labelledby="contained-modal-title"
										>
											<Modal.Header closeButton>
												<Modal.Title id="contained-modal-title">New Doctor</Modal.Title>
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
																		value={this.props.new_doctor.name}
																		onChange={(e) =>
																			this.props.updateNewDoctor({
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
																		value={this.props.new_doctor.phone}
																		maxLength={11}
																		onChange={(e) =>
																			this.props.updateNewDoctor({
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
																		value={this.props.new_doctor.age}
																		onChange={(e) =>
																			this.props.updateNewDoctor({
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
																		value={this.props.new_doctor.gender}
																		onChange={(e) =>
																			this.props.updateNewDoctor({
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
																	<ControlLabel>Speciality</ControlLabel>
																	<FormControl
																		componentClass="select"
																		placeholder="select"
																		value={this.props.new_doctor.speciality}
																		onChange={(e) =>
																			this.props.updateNewDoctor({
																				speciality: e.target.value
																			})}
																	>
																		<option value="">select</option>
																		<option value="anesthesiologists">
																			Anesthesiologists
																		</option>
																		<option value="cardiologists">
																			Cardiologists
																		</option>
																		<option value="dermatologists">
																			Dermatologists
																		</option>
																	</FormControl>
																</FormGroup>
															</Col>
														</Row>
													</Form>
												</Grid>
											</Modal.Body>
											<Modal.Footer>
												<Button bsStyle="success" onClick={this.saveDoctor}>
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
		doctors: state.doctorReducer.doctors,
		new_doctor: state.doctorReducer.new_doctor,
		add_doctor_modal: state.doctorReducer.add_doctor_modal,
		message: state.notificationReducer.message,
		messageType: state.notificationReducer.type
	}),
	{ getDoctors, togglAddDoctorModal, postDoctor, clearMessage, updateNewDoctor }
)(Doctors);
