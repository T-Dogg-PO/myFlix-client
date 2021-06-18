// Import React and the useState Hook from the React library
import React, { useState } from 'react';
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
        <form>
            <label>
                Username:
                {/* When this input field is changed, onChange will call the setUsername function defined above to change the login variables to this current value */}
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            {/* Two buttons which, when clicked, will call different functions to either log in or go to the registration page */}
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="submit" onClick={props.toggleRegister}>New here? Click here to Register</button>
        </form>
    );
}

// Set the propTypes property on LoginView
LoginView.propTypes = {
    toggleRegister: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
};