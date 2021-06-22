// Import React and the useState Hook from the React library
import React, { useState } from 'react';

// Import React Bootstrap components which will be used in this view
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the scss file for this view
import './login-view.scss'

// Expose the LoginView component for use in other parts of the app using export
export function LoginView(props) {
    // useState() is called (imported from React) with an empty string (which is the initial value of the login variables). This method returns an array.
    // This array is deconstructed. The current value is assigned to username/password, and a method to update the variables to setUsername/setPassword.
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    // Function for submitting the login credentails provided and sending them to the server for authentication
    const handleSubmit = (e) => {
        // e.preventDefault() will stop the page from refreshing once the submit button is clicked (which would be the default behaviour)
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication, then call props.onLoggedIn(username)
        // NOTE that props.onLoggedIn(username) will allow any credentials to log in successfully, and is only for learning/testing purposes. This logic will be updated to a robust login procedure at a later date
        props.onLoggedIn(username);
    };

    // Return the HTML code for the login form
    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button varient="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="float-right" varient="primary" type="button" onClick={props.toggleRegister}>
                No account? Click here to Register!
            </Button>
        </Form>
    );
}

// Set the propTypes property on LoginView
LoginView.propTypes = {
    toggleRegister: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
};