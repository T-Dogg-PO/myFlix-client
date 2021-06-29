// Import React
import React from 'react';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import necessary Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Import the scss file for this view
import './genre-view.scss'

// Export the GenreView class that extends the component template React.Component
export class GenreView extends React.Component {
    render() {
        // Get the genre and the onBackClick details from this objects props
        const { genre, onBackClick } = this.props;
        // Return a single div (genre-view) that contains details about this genre
        return (
            <Card border="dark">
                <Card.Body>
                    <Card.Title className="text-center">{genre.Name}</Card.Title>
                    <Card.Text>{genre.Description}</Card.Text>
                    <Button className="mx-auto genre-view-btn" onClick={() => onBackClick(null)} varient="link">Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

// Set the propTypes property on the GenreView to an object that in turn contains a gebre object which specifies the type of information displayed on the genre-view page
GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
    onBackClick: PropTypes.func.isRequired
};