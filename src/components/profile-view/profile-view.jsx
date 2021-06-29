// Import React into this file
import React from 'react';
// Import axios (a library for making ajax requests from our database)
import axios from 'axios';

// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import the scss file for this view
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            validated: false,
            username: '',
            password: '',
            email: '',
            birthDate: ''
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
    }

    getUserDetails(token) {
        axios.get(`https://t-dogg-movies-api.herokuapp.com/users/${this.props.user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            this.setState({
                userDetails: response.data
            });
        }).catch(function(error) {
            console.log(error);
        });
    };

    updateUserDetails(e) {
        const form = e.currentTarget.parentNode;
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ validated: true });
        } else {
            e.preventDefault();
            this.setState({ validated: true });
            axios.put(`https://t-dogg-movies-api.herokuapp.com/users/${user}`, {
                Username: this.state.username,
                Password: this.state.password,
                Email: this.state.email,
                Birthday: this.state.birthDate
            }, {
                headers: { Authorization: `Bearer ${token}`}
            }).then(response => {
                const data = response.data;
                localStorage.setItem('user', data.Username);
                // console.log(data);
                window.open('/', '_self');
            }).catch(error => {
                console.log('error updating user details')
            });
        }
    };

    handleFieldChange(event) {
        let {name, value} = event.target;
        this.setState({ [name]: value})
    }

    render() {
        const { user, onBackClick} = this.props;
        // console.log(this.state.userDetails)

        return (
            <div className="profile_view">
                <Card border="dark">
                    <Card.Body>
                        <Card.Title className="text-center">Profile of {this.state.userDetails.Username}</Card.Title>
                        <Card.Text><span className="profile_heading">Email: </span>{this.state.userDetails.Email}</Card.Text>
                        <Card.Text><span className="profile_heading">Email: </span>{this.state.userDetails.Email}</Card.Text>
                        {this.state.userDetails.Birthday && (
                            <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(this.state.userDetails.Birthday))}</Card.Text>
                        )}
                    </Card.Body>
                </Card>
                <Card border="dark">
                    <Card.Body>
                        <Card.Title className="text-center">Update Profile Details</Card.Title>
                        <Form noValidate validated={this.state.validated}>
                            <Form.Group controlId="updateFormUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control name="username" type="text" onChange={this.handleFieldChange} required />
                                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="updateFormPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name="password" type="password" onChange={this.handleFieldChange} required />
                                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="updateFormEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleFieldChange} required />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="updateDateOfBirth">
                                <Form.Label>Date of Birth:</Form.Label>
                                <Form.Control name="birthDate" type="date" onChange={this.handleFieldChange} />
                            </Form.Group>

                            <Button varient="primary" type="submit" onClick={this.updateUserDetails}>
                                Update Details
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Button onClick={() => onBackClick(null)} varient="link">Back</Button>
            </div>
        );
    }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
    user: PropTypes.string.isRequired
};