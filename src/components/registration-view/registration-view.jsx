// Import React and the useState Hook from the React library
import React, { useState } from 'react';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the React Bootstrap components which will be used in this view
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Import the Link component from react-router-dom for the Register button
import { Link } from 'react-router-dom';

// Import the scss file for this view
import './registration-view.scss';
import axios from 'axios';

// Expose the RegistrationView component for use in other parts of the app
export function RegistrationView(props) {
    // useState() is called with an empty string for the starting value of the registration variables
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');
    // Extra state for this view to be used in the Form Validation. Starting value is false
    const [ validated, setValidated ] = useState(false);

    // https://stackoverflow.com/questions/63494157/react-bootstrap-forms-form-control-feedback-form-control-feedback-is-not-di
    // Function for submitting the registration credentials
    const handleSubmit = (e) => {
        // Get the form element and store it in the const form (currentTarget of the event is the submit button, and the form element is the parentNode of that)
        const form = e.currentTarget.parentNode;
        // Use checkValidity() to check for any validation errors in the form (based on what is described in the form elements attributes)
        if (form.checkValidity() === false) {
            // If checkValidity() returns false, stop the submission. stopPropagation() is used to stop propagation of the same event being called
            e.preventDefault();
            e.stopPropagation();
            // Even if the form is not valid, the validated state variable needs to be set to true. This will toggle any validation styles on the forms elements (as per React Bootstraps documentation)
            setValidated(true);
        } else {
            // Prevent the default behaviour of submitting the form (which would refresh the page)
            e.preventDefault();
            // Change the validated state variable to true to mark the form as validated
            setValidated(true);
            axios.post('https://t-dogg-movies-api.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthDate
            }).then(response => {
                const data = response.data;
                console.log(data);
                // This will redirect to the default route ('/'). The second argument '_self' is necessary to prevent a new window from opening
                window.open('/', '_self');
            }).catch(e => {
                console.log('error registering the user')
            });
            // // props.onRegistration will call a function in main-view.jsx which for now will just reload the login page
            // props.onRegistration(); 
        }
    };

    // Return the HTML code for the login form
    return (
        // The noValidate attribute will prevent default HTML5 validation, meaning we can get nice looking Bootstrap validation instead
        // The validated attribute is taken from the validated state variable. Marks whether the form has been validated or not, and will toggle validation on the form elements
        <Form noValidate validated={validated}>
            <Form.Group controlId="registrationFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registrationFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registrationFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" onChange={e => setEmail(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registrationDateOfBirth">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control type="date" onChange={e => setBirthDate(e.target.value)} />
            </Form.Group>

            <Button varient="primary" type="submit" onClick={handleSubmit}>
                Register
            </Button>
            <Link to={'/'} className="float-right">
                <Button varient="link" type="button">Back to Login</Button>
            </Link>
        </Form>
    );
}

// Set the propTypes of the RegistrationView
// RegistrationView.propTypes = {
//     onRegistration: PropTypes.func.isRequired
// };