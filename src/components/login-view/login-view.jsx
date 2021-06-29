// Import React and the useState Hook from the React library
import React, { useState } from 'react';
// Import Axios which is a library that will be used to send requests to our database
import axios from 'axios';

// Import React Bootstrap components which will be used in this view
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Import the Link component from react-router-dom for the Register button
import { Link } from 'react-router-dom';

// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the scss file for this view
import './login-view.scss';

// Expose the LoginView component for use in other parts of the app using export
export function LoginView(props) {
    // useState() is called (imported from React) with an empty string (which is the initial value of the login variables). This method returns an array.
    // This array is deconstructed. The current value is assigned to username/password, and a method to update the variables to setUsername/setPassword.
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // Extra state for this view to be used in the Form Validation. Starting value is false
    const [ validated, setValidated ] = useState(false);

    // Function for submitting the login credentails provided and sending them to the server for authentication
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
            // e.preventDefault() will stop the page from refreshing once the submit button is clicked (which would be the default behaviour)
            e.preventDefault();
            // Change the validated state variable to true to mark the form as validated
            setValidated(true);
            // Send a request to the server for authentication (the logic for authenticating the user is done through the logic of the login endpoint)
            axios.post('https://t-dogg-movies-api.herokuapp.com/login', {
                Username: username,
                Password: password
            // Then if there is a match in the database then call the onLoggedIn method, which will update the user state in MainView
            }).then(response => {
                // Store the response details (including the JWT token) in data, and pass data to onLoggedIn
                const data = response.data;
                props.onLoggedIn(data);
            // Otherwise log an error message to the console stating that no such user exists
            }).catch(e => {
                console.log('Invalid credentials')
            });
        }
    };

    // Return the HTML code for the login form
    return (
        // The noValidate attribute will prevent default HTML5 validation, meaning we can get nice looking Bootstrap validation instead
        // The validated attribute is taken from the validated state variable. Marks whether the form has been validated or not, and will toggle validation on the form elements
        <Form noValidate validated={validated}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
            </Form.Group>
            <Button varient="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Link to={`/register`} className="float-right">
                <Button varient="link" type="button">No account? Click here to Register!</Button>
            </Link>
        </Form>
    );
}

// Set the propTypes property on LoginView
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};