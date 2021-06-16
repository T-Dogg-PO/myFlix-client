// Import React
import React from 'react';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the scss file for this view
import './movie-card.scss'

// Export a new class called MovieCard that extends the component template React.Component
export class MovieCard extends React.Component {
    render() {
        // Gets each movie's data from this.props and stores it in the movie object
        const { movieData, onMovieClick } = this.props;
        // Return a div with the movie's title
        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    }
}

// Set the propTypes property on MovieCard to an object that contains special utilities/specifications provided by the prop-types library
MovieCard.propTypes = {
    // The props object must contain a movie object (shape({}) defines it as an object data type
    movie: PropTypes.shape({
        // Required Title key for movie object, it must be a string
        Title: PropTypes.string.isRequired,
        // Required Description key for movie object, it must be a string
        Description: PropTypes.string.isRequired,
        // Optional Genre key for movie object (if included, must be an object), which can contain both a name and description (both strings)
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        // Optional Director key for movie object (if included, must be an object), which can contain a name, description and dates (all strings)
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.string,
            Death: PropTypes.string
        }),
        // Optional Actors key, which if included must be an array of strings
        Actors: PropTypes.arrayOf(PropTypes.string),
        // Optional ImagePath key which must be a string
        ImagePath: PropTypes.string,
        // Optional Featured key which must be a boolean
        Featured: PropTypes.bool
    }).isRequired,
    // The props object must contain onMovieClick and it must be a function
    onMovieClick: PropTypes.func.isRequired
};