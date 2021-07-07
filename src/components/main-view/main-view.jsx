// Import React into this file
import React from 'react';
// Import axios (a library for making ajax requests from our database)
import axios from 'axios';

import { connect } from 'react-redux';

// Import library components from react-router-dom for our routing. BrowerRouter is used to implement state-based routing
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Import the React Bootstrap components that will be used in this view
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

import { setMovies } from '../../actions/actions';

// Import the different components used in this view
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';

// Import the scss file for this view
import './main-view.scss';

// Expose the MainView component for use in other parts of the app using export
// Create the MainView component by extending the functionality of the component template React.Component
class MainView extends React.Component {
    // The constructor() method will initialize the component and create it in memory
    constructor() {
        // super() will call the constructor of the parent class (i.e. React.Component)
        super();
        // After super() in the constructor method, additional code can be added which will be executed when the component is created in memory (before being rendered)
        // this.state inside the constructor() method is initializing the starting value of the MainView state to an object containing an array of movies (called movies)
        this.state = {
            // movies: [],
            // Initialize the starting value of selectedMovie, which will be used to display a movies details
            selectedMovie: null,
            // Initialize the starting value of user, which will be null until a user is logged in through the login-view
            user: null
        };
    }

    // Code that will be executed after the component is rendered to the DOM / has been mounted. Place for async tasks such as ajax requests or event listeners
    // In this case, getting the accessToken from localStorage to persist login data between page refreshes
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
            });
            this.getMovies(accessToken);
        }
    }

    // Custom method for changing the MainView state (for selectedMovie) which will mean the page will render either a single movie or a list of movies
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    // Custom method for updating the MainView state for the user property once a user is logged in, and storing the JWT token in localStorage
    onLoggedIn(authData) {
        console.log(authData);
        // Update the MainView state with the username passed in from LoginView
        this.setState({
            user: authData.dataReturned.Username,
        });
        // Update localStorage with the username and JWT token so we can store this users session
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.dataReturned.Username);
        // Call the getMovies function to get the list of movies from the server's API
        this.getMovies(authData.token);
    }

    // Custom method for querying the database to retrieve a list of movies
    getMovies(token) {
        // Use axios to send a request to the movies endpoint of our API
        axios.get('https://t-dogg-movies-api.herokuapp.com/movies', {
            // By passing Bearer authoriztion in the header of the HTTP request, we can make authenticated requests to the API
            headers: { Authorization: `Bearer ${token}`}
        // Then set the state of MainView so we can access the list of movies
        }).then(response => {
            // this.setState({
            //     movies: response.data
            // });
            this.props.setMovies(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    // Custom method for logging a user out by removing the username and JWT from localStorage, then setting the user state of MainView to null
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    // render() will return the visual representation of the component. Inside the function is the JSX code which will be rendered.
    render() {
        // Get the variables stored in this view's state, ready for use in the logic below
        // const { movies, user } = this.state;
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router>                
                <Navbar expand="lg" className="mb-4" sticky="top">
                    <Navbar.Brand className="ml-4">
                        <Link to={'/'}>
                            <Image src="https://i.imgur.com/ykYgWv5.png" alt="myFlix logo" className="d-inline-block align-top" />
                        </Link>
                    </Navbar.Brand>
                    {user && (
                        <Navbar.Collapse className="justify-content-end">
                            <Link to={`/users/${user}`} className="mr-2">
                                <Button varient="link">Profile for {user}</Button>
                            </Link>
                            <Button onClick={() => this.onLoggedOut()} varient="link">Logout</Button>
                        </Navbar.Collapse> 
                    )}
                </Navbar>
                <Container>
                {/* The movie attribute uses the movie prop from movie-card.jsx or movie-view.jsx to load the data into the MovieCard/MovieView element
                The onBackClick attribute executes the same setSelectedMovie function above, except will pass it a null value instead of a movie */}
                <Row className="main-view justify-content-md-center">
                    {/* Each Route component has a path prop that tells us what the route should be, as well as a render() prop that dictates what gets rendered if the url matches the path */}
                    <Route exact path="/" render={() => {
                        // If there is no user logged in (i.e. the user state is null) then the login-view will be rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
                        if (!user) return (
                            <Col md={8}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                        
                        // If the state of the movies array is empty, display nothing while the data is fetched from the database
                        if (movies.length === 0) return <div className="main-view" />;

                        // Note that movies.map will call the provided callback function for each element in the movies array
                        // The key attribute for each movie item will help React distinguish between similar items for efficient changing/removing
                        // return movies.map(movie => (
                        //     <Col md={3} key={movie._id} className="my-2">
                        //         <MovieCard movieData={movie} />
                        //     </Col>
                        // ))
                        return <MoviesList movies={movies} />;
                    }} />

                    {/* Route to the registiraion view when the Register button is clicked */}
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return (
                            <Col md={8}>
                                <RegistrationView onRegistration={() => this.onRegistration()} />
                            </Col>
                        )
                    }} />

                    {/* Route to the movies/:movieId page. onBackClick uses the history method built into react-router-dom to go back pages */}
                    {/* Searches the database to find a movie id that matches the request, and returns the found movie as props to the MovieView component */}
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        // If there is no user logged in (i.e. the user state is null) then the login-view will be rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
                        if (!user) return (
                            <Col md={8}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                        
                        // If the state of the movies array is empty, display nothing while the data is fetched from the database
                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <MovieView movie={movies.find(selectedMovie => selectedMovie._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* Route for a specific director */}
                    <Route path="/directors/:name" render={({ match, history }) => {
                        // If there is no user logged in (i.e. the user state is null) then the login-view will be rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
                        if (!user) return (
                            <Col md={8}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <DirectorView director={movies.find(selectedMovie => selectedMovie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* Route for a specific genre */}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        // If there is no user logged in (i.e. the user state is null) then the login-view will be rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
                        if (!user) return (
                            <Col md={8}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <GenreView genre={movies.find(selectedMovie => selectedMovie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* Route for a user's profile page */}
                    <Route path="/users/:username" render={({ history }) => {
                        // If there is no user logged in (i.e. the user state is null) then the login-view will be rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
                        if (!user) return (
                            <Col md={8}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );

                        if (movies.length === 0) return <div className="main-view" />;
                        
                        return <Col md={10}>
                            <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>

                </Container>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);