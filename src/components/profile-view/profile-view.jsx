// Import React into this file
import React from 'react';
// Import axios (a library for making ajax requests from our database)
import axios from 'axios';

// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import all the Bootstrap components we will be using
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import the MovieCard component so that we can link to it in the favourites list
import { MovieCard } from '../movie-card/movie-card';

// Import the scss file for this view
import './profile-view.scss';

// Expose the ProfileView component for use in the rest of the app
export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        // Set the state variables which will be used for updating user details
        this.state = {
            userDetails: [],
            validated: false,
            username: '',
            password: '',
            email: '',
            birthDate: '',
            favouriteMovies: [],
            modalState: false
        }

        // Bind all the functions that are defined below to 'this'
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteUserDetails = this.deleteUserDetails.bind(this);
    }

    // During the componentDidMount() part of the lifecycle, call getUserDetails to get the user's information from the database
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        // this.getUserDetails(accessToken);
    }

    // getUserDetails makes a request to the database for this user's details
    getUserDetails(token) {
        console.log(this.props.user)
        axios.get(`https://t-dogg-movies-api.herokuapp.com/users/${this.props.user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            this.setState({
                // Store the details in the appropriate state variables (separating the favouriteMovies array for ease of use)
                userDetails: response.data,
                favouriteMovies: response.data.FavouriteMovies
            });
        }).catch(function(error) {
            console.log(error);
        });
    };

    // Function for updating user details, which will be called when the update details Form us submitted
    updateUserDetails(e) {
        const form = e.currentTarget.parentNode;
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        // Make use of Bootstraps built in validation, changing the state validated variable to true to indicate that the form has undergone validation (not to indicate if it's passed validation or not)
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ validated: true });
        } else {
            e.preventDefault();
            this.setState({ validated: true });
            // If validation passed, then make a put request to the API, updating all the details on the form (which are now stored in the state variables thanks to the handleFieldChange function)
            axios.put(`https://t-dogg-movies-api.herokuapp.com/users/${user}`, {
                Username: this.state.username,
                Password: this.state.password,
                Email: this.state.email,
                Birthday: this.state.birthDate
            }, {
                headers: { Authorization: `Bearer ${token}`}
            }).then(response => {
                const data = response.data;
                // Update localStorage with the new username
                localStorage.setItem('user', data.Username);
                // Reload the page to make sure that the user can immediately start using their new details
                window.open(`/users/${data.Username}`, '_self');
            }).catch(error => {
                console.log('error updating user details')
            });
        }
    };

    // Function for updating the appropriate state variables as the user fills out the update form
    handleFieldChange(event) {
        let {name, value} = event.target;
        this.setState({ [name]: value})
    }

    // Function to show the modal that confirms you want to delete a user profile
    showModal() {
        this.setState({ modalState: true });
    }

    // Fuunction for closing the modal that confirms you want to delete a user profile
    closeModal() {
        this.setState({ modalState: false });
    }

    // Function for deleting user details. A delete request is made ot the API for this user
    deleteUserDetails() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.delete(`https://t-dogg-movies-api.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            const data = response.data;
            alert(user + " has been deleted");
            // Remove the user details and auth token from localStorage, and send the user back to the login page (since they are now logged out)
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open(`/}`, '_self');
        }).catch(error => {
            console.log('error deleting the user');
        })
    }

    // Render function to display items on the DOM
    render() {
        // Get the props that were passed into this view and store them in appropriate variables
        const { movies, onBackClick, user} = this.props;

        // Section of code for getting the users favourites (so that they can be displayed on the page)
        // I am aware that this probably isn't the best way/place to get this information, but I couldn't work out another way to do it
        // In hindsight, if I was writing this again I'd use a function component for ProfileView instead of a class component to make working with this information easier
        // First get the array of a user's favourite movies (which was obtained from the initial GET request to the API)
        // let tempArray = this.state.favouriteMovies;
        // Get an empty array which will store all of the movie objects which match the favourites list
        let favouriteMoviesArray = [];
        // Filter the movies array (obtained from props) and only save those movies which match ID's from the list of the users favourites
        favouriteMoviesArray = movies.filter(movie => user.FavouriteMovies.includes(movie._id));

        return (
            <div className="profile_view">
                {/* Modal specifications which will display when attempting to delete a user */}
                <Modal show={this.state.modalState} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete your user profile?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Once a user profile has been deleted, there is no way to restore it. Are you sure you wish to continue?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.deleteUserDetails}>
                            Delete Profile
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Card for displaying current user details */}
                <Card border="dark">
                    <Card.Body>
                        <Card.Title className="text-center">Profile of {user.Username}</Card.Title>
                        <Card.Text><span className="profile_heading">Email: </span>{user.Email}</Card.Text>
                        {/* Only display birthday section if a user has filled that out (since it's the only optional section) */}
                        {user.Birthday && (
                            <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(user.Birthday))}</Card.Text>
                        )}
                    </Card.Body>
                </Card>
                {/* Card for displaying the form which will be used to update user details */}
                <Card border="dark">
                    <Card.Body>
                        <Card.Title className="text-center">Update Profile Details</Card.Title>
                        {/* noValidate prevents default HTML5 validation. validated is then used as part of Bootstraps validation process */}
                        <Form noValidate validated={this.state.validated}>
                            <Form.Group controlId="updateFormUsername">
                                <Form.Label>Username:</Form.Label>
                                {/* When the input is changed, call handleFieldChange to update the state variables as required */}
                                <Form.Control name="username" type="text" onChange={this.handleFieldChange} required />
                                {/* Validation message which will only display on failed validation */}
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

                            {/* Button for updating the details which will call updateUserDetails (defined above) */}
                            <Button varient="primary" type="submit" onClick={this.updateUserDetails}>
                                Update Details
                            </Button>
                            {/* Button to go back to the previous view */}
                            <Button onClick={() => onBackClick(null)} varient="link">Back</Button>
                            {/* Button for deleting the user. This will first open the Modal defined above */}
                            <Button className="float-right" variant="danger" onClick={this.showModal}>
                                Delete User Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                {/* Section for favourites */}
                <h5>Favourites for {this.state.userDetails.Username}:</h5>
                <Row>
                    {/* Iterate over the favouriteMoviesArray and create a MovieCard component for each one */}
                    {/* At this stage, I don't have a way to remove a favourite movie from the ProfileView page. It must be done from the MovieView page, although I will likely change this in the future */}
                    {favouriteMoviesArray.map(movie => (
                        <Col md={4} key={movie._id} className="my-2">
                            <MovieCard movieData={movie} />
                        </Col>))}
                </Row>
            </div>
        );
    }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            ImagePath: PropTypes.string,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string,
                Description: PropTypes.string
            }),
            Director: PropTypes.shape({
                Name: PropTypes.string,
                Bio: PropTypes.string,
                Birth: PropTypes.string,
                Death: PropTypes.string
            }),
        })
    ),
    onBackClick: PropTypes.func.isRequired
};