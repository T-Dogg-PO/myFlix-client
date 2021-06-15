// Import React into this file
import React from 'react';
// Import axios (a library for making ajax requests from our database)
import axios from 'axios';

// Import the different components used in this view
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Expose the MainView component for use in other parts of the app using export
// Create the MainView component by extending the functionality of the component template React.Component
export default class MainView extends React.Component {
    // The constructor() method will initialize the component and create it in memory
    constructor() {
        // super() will call the constructor of the parent class (i.e. React.Component)
        super();
        // After super() in the constructor method, additional code can be added which will be executed when the component is created in memory (before being rendered)
        // this.state inside the constructor() method is initializing the starting value of the MainView state to an object containing an array of movies (called movies)
        this.state = {
            movies: [],
            // Initialize the starting value of selectedMovie, which will be used to display a movies details
            selectedMovie: null,
            // Initialize the starting value of user, which will be null until a user is logged in through the login-view
            user: null
        };
    }

    // Code that will be executed after the component is rendered to the DOM / has been mounted. Place for async tasks such as ajax requests or event listeners
    // In this case, we are making a call to the GET /movies endpoint to get a list of movies, then adding the list of movies to the state.movies array
    componentDidMount() {
        axios.get('https://t-dogg-movies-api.herokuapp.com/movies').then(response => {
            this.setState({
                movies: response.data
            });
        }).catch(error => {
            console.log(error);
        });
    }

    // Custom method for changing the MainView state (for selectedMovie) which will mean the page will render either a single movie or a list of movies
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    // Custom method for updating the MainView state for the user property once a user is logged in
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    // render() will return the visual representation of the component. Inside the function is the JSX code which will be rendered.
    render() {
        // Get the movies array stored in the views state
        const { movies, selectedMovie, user } = this.state;

        // If there is no user logged in (i.e. the user state is null) then the login-view will be rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // If the state of the movies array is empty, display nothing while the data is fetched from the database
        if (movies.length === 0) return <div className="main-view" />;
        
        // Else return either the details for a single movie with the MovieView component, or the entire list of movies using movies.map and the MovieCard component (depending on if selectedMovie has been set or not)
        return (
            // Note that movies.map will call the provided callback function for each element in the movies array
            // The key attribute for each movie item will help React distinguish between similar items for efficient changing/removing
            // The movie attribute uses the movie prop from movie-card.jsx or movie-view.jsx to load the data into the MovieCard/MovieView element
            // The onBackClick attribute executes the same setSelectedMovie function above, except will pass it a null value instead of a movie
            <div className="main-view">
                {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                : movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
            </div>
        );
    }
}