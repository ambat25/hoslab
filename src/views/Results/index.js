import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, Table, FormControl, Modal, Button } from 'react-bootstrap';

class UserProfile extends Component {
	state = {
		showModal: false
	};
	closeModal = () => {
		this.setState({
			showModal: false
		});
	};
	savePatient = () => {
		this.setState({
			showModal: false
		});
	};
	openModal = () => {
		this.setState({
			showModal: true
		});
	};
	render() {
		return (
			<div className="content">
				<Grid>
					<div style={{ textAlign: 'right', marginBottom: '10px' }}>
						<Button className="btn-circle btn-xl" onClick={this.openModal}>
							<i className="fa fa-plus" />
						</Button>
					</div>
					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>#</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
						</tbody>
					</Table>
				</Grid>
				<div className="static-modal">
					<Modal
						show={this.state.showModal}
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
												<FormControl placeholder="Aliyu Ilyasu" />
											</FormGroup>
										</Col>
										<Col sm={6}>
											<FormGroup>
												<ControlLabel> Phone </ControlLabel>
												<FormControl type="phone" required={true} placeholder="080xxxxxxxx" />
											</FormGroup>
										</Col>
										<Col sm={6}>
											<FormGroup>
												<ControlLabel> Age </ControlLabel>
												<FormControl type="number" required={true} placeholder="15" min={1} />
											</FormGroup>
										</Col>
										<Col sm={6}>
											<FormGroup controlId="formControlsSelect">
												<ControlLabel>Gender</ControlLabel>
												<FormControl componentClass="select" placeholder="select">
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
												/>
											</FormGroup>
										</Col>
									</Row>
								</Form>
							</Grid>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.savePatient}>Save</Button>
							<Button onClick={this.closeModal}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		);
	}
}

export default UserProfile;
