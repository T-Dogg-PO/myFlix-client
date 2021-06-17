// Import React
import React from 'react';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the scss file for this view
import './movie-view.scss'

// Export the MovieView class that extends the component template React.Component
export class MovieView extends React.Component {
    render() {
        // Get the movie and the onBackClick details from this objects props
        const { movie, onBackClick } = this.props;
        // Return a single div (movie-view) that contains divs for the ImagePath, Title and Description
        return (
            // The onClick attribute for the button calls the onBackClick function (defined in main-view) with the value null
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button> 
            </div>
        );
    }
}

// Set the propTypes property on the MovieView to an object that in turn contains a movie object which specifies the type of information displayed on the movie-view page
MovieView.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    })
};