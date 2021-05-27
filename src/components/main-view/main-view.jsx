// Import React into this file
import React from 'react';

// Import the different components used in this view
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Expose the MainView component for use in other parts of the app using export
// Create the MainView component by extending the functionality of the component template React.Component
export default class MainView extends React.Component {
    // The constructor() method will initialize the component and create it in memory
    constructor() {
        // super() will call the constructor of the parent class (i.e. React.Component)
        super();
        // this.state inside the constructor() method is initializing the starting value of the MainView state to an object containing an array of movies (called movies)
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
            ],
            // Initialize the starting value of selectedMovie, which will be used to display a movies details
            selectedMovie: null
        }
    }

    // Custom method for loading the movie-view when a movie-card is clicked
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    // render() will return the visual representation of the component. Inside the function is the JSX code which will be rendered.
    render() {
        // Get the movies array stored in the views state
        const { movies, selectedMovie } = this.state;

        // If the state of the movies array is empty, display an appropriate message
        if (movies.length === 0) return <div className="main-view">The list of movies is empty!</div>;

        // If a user has selected a movie, change the UI to display the MovieView component for this movie
        
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