// Import React
import React from 'react';

// Export a new class called MovieCard that extends the component template React.Component
export class MovieCard extends React.Component {
    render() {
        // Gets each movie's data from this.props and stores it in the movie object
        const { movieData, onMovieClick } = this.props;
        // Return a div with the movie's title
        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    }
}