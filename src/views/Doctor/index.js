import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
	getSingleDoctor,
	updateCurrentDoctor,
	updateDoctor,
	getDoctorDetails,
	togglEditDoctor
} from '../../reducers/doctors';
import { clearMessage } from '../../reducers/notifications';
import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

class DoctorProfile extends Component {
	componentWillMount() {
		this.props.getDoctorDetails(this.props.match.params.id);
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log('okay');
		if (this.props.message) {
			const { message, messageType, clearMessage } = this.props;
			messageType === 'success' ? toast.success(message) : toast.error(message);
			clearMessage();
		}
	};

	handleEditSubmit = (e) => {
		e.preventDefault();
		this.props.togglEditDoctor(true);
		this.props.updateDoctor(this.props.doctor);
	};

	handleEditDoctorName = (e) => {
		this.props.updateCurrentDoctor({ name: e.target.value });
	};

	handleEditDoctorPhone = (e) => {
		this.props.updateCurrentDoctor({ phone: e.target.value });
	};

	handleEditDoctorAge = (e) => {
		this.props.updateCurrentDoctor({ age: e.target.value });
	};

	handleEditDoctorGender = (e) => {
		this.props.updateCurrentDoctor({ gender: e.target.value });
	};

	handleEditDoctorSpeciality = (e) => {
		this.props.updateCurrentDoctor({ speciality: e.target.value });
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
						<Link to="/doctors">Doctors</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item active>{this.props.doctor.name}</Breadcrumb.Item>
				</Breadcrumb>
				<ToastContainer />
				<Grid fluid>
					<Row>
						<Col md={12}>
							{Object.keys(this.props.doctor).length ? (
								<Card
									title={`${this.props.doctor.name.toString().toUpperCase()} (doctor)`}
									content={
										<div>
											<div>
												<Button
													bsStyle="success"
													fill
													pullRight
													onClick={() => this.props.togglEditDoctor(!this.props.edit_doctor)}
												>
													<i className="fa fa-pencil" />
												</Button>
												<div className="clearfix" />
											</div>
											<form onSubmit={this.handleEditSubmit}>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Name</ControlLabel>
													<FormControl
														disabled={!this.props.edit_doctor}
														value={this.props.doctor.name}
														onChange={this.handleEditDoctorName}
													/>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Phone</ControlLabel>
													<FormControl
														disabled={!this.props.edit_doctor}
														value={this.props.doctor.phone}
														onChange={this.handleEditDoctorPhone}
													/>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Age</ControlLabel>
													<FormControl
														disabled={!this.props.edit_doctor}
														value={this.props.doctor.age}
														onChange={this.handleEditDoctorAge}
													/>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Gender</ControlLabel>
													<FormControl
														componentClass="select"
														disabled={!this.props.edit_doctor}
														value={this.props.doctor.gender}
														onChange={this.handleEditDoctorGender}
													>
														<option value="">select</option>
														<option value="male">Male</option>
														<option value="female">female</option>
													</FormControl>
												</FormGroup>
												<FormGroup className={'col-sm-6'}>
													<ControlLabel>Speciality</ControlLabel>
													<FormControl
														componentClass="select"
														placeholder="select"
														disabled={!this.props.edit_doctor}
														value={this.props.doctor.speciality}
														onChange={this.handleEditDoctorSpeciality}
													>
														<option value="">select</option>
														<option value="anesthesiologists">Anesthesiologists</option>
														<option value="cardiologists">Cardiologists</option>
														<option value="dermatologists">Dermatologists</option>
													</FormControl>
												</FormGroup>
												{this.props.edit_doctor ? (
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
								title="Doctor Record"
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
		doctorsExist: state.doctorReducer.doctors.length !== 0,
		doctor: state.doctorReducer.current_doctor,
		edit_doctor: state.doctorReducer.edit_doctor,
		message: state.notificationReducer.message,
		messageType: state.notificationReducer.type
	}),
	{
		getSingleDoctor,
		updateCurrentDoctor,
		updateDoctor,
		getDoctorDetails,
		togglEditDoctor,
		clearMessage
	}
)(DoctorProfile);
