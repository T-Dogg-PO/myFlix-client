// Import React and the useState Hook from the React library
import React, { useState } from 'react';

// Expose the LoginView component for use in other parts of the app using export
// Extend the functionality of the React.Component class
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

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

// Old method that does not use React Hooks
    // // Constructor initializes the component and creates it in memory
    // constructor(props) {
    //     // super() will call the constructor of the parent class and allow us to use the functionality of React.Component
    //     super(props);

    //     // Store the username and password in the local state
    //     this.state = {
    //         username: '',
    //         password: '',
    //     };

    //     // bind() is a built in React method used to pass data as an argument to the function of a class based component
    //     // In this case, the 'this' keyword will always refer to this component (i.e. LoginView)
    //     this.onUsernameChange = this.onUsernameChange.bind(this);
    //     this.onPasswordChange = this.onPasswordChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    // // Function for updating the username of this component based on the submitted username
    // onUsernameChange(event) {
    //     this.setState({
    //         username: event.target.value
    //     });
    // }

    // // Function for updating the password of this component based on the submitted password
    // onPasswordChange(event) {
    //     this.setState({
    //         password: event.target.value
    //     });
    // }

    // // Function that will send the username and password (as set in the props state of this component) to the server for validation
    // handleSubmit() {
    //     const { username, password } = this.state;
    //     console.log(username, password);
    //     // Send a request to the server for authentication
    //     // Then call this.props.onLoggedIn(username)
    // }

    // // render() will display the login form on the DOM for the user to interact with
    // render() {
    //     return (
    //         <form>
    //             <label>
    //                 Username:
    //                 <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
    //             </label>
    //             <label>
    //                 Password:
    //                 <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
    //             </label>
    //             <button type="button" onClick={this.handleSubmit}>Submit</button>
    //         </form>
    //     );
    // }
// }