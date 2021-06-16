// Import React and the useState Hook from the React library
import React, { useState } from 'react';

// Import the scss file for this view
import './registration-view.scss'

// Expose the RegistrationView component for use in other parts of the app
export function RegistrationView(props) {
    // useState() is called with an empty string for the starting value of the registration variables
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');

    // Function for submitting the registration credentials
    const handleSubmit = (e) => {
        // Prevent the default behaviour of submitting the form (which would refresh the page)
        e.preventDefault();
        // Log the details to the console (for now)
        console.log(username, password, email, birthDate);
        // props.onRegistration will call a function in main-view.jsx which for now will just reload the login page
        props.onRegistration();
    };

    // Return the HTML code for the login form
    return (
        <form>
            <label>
                Username:
                {/* When this input field is changed, onChange will call the setUsername function defined above to change the values of the registration variables */}
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Date of Birth:
                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
            </label>
            {/* Two buttons which, when clicked, will call different functions to either register or go back to the login page */}
            <button type="submit" onClick={handleSubmit}>Register</button>
            <button type="button" onClick={() => {props.toggleRegister(); }}>Back</button>
        </form>
    );
}