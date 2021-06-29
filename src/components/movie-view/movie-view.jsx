// Import React
import React from 'react';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the Link component from react-router-dom for the View Movie Details button
import { Link } from 'react-router-dom';

// Import necessary Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import the scss file for this view
import './movie-view.scss';

// Export the MovieView class that extends the component template React.Component
export class MovieView extends React.Component {
    render() {
        // Get the movie and the onBackClick details from this objects props
        const { movie, onBackClick } = this.props;
        // Return a single div (movie-view) that contains divs for the ImagePath, Title and Description
        return (
            <Card border="dark">
                <Card.Body>
                    <Row>
                        <Col xs={12} md={6}>
                            <Card.Img varient="top" src={movie.ImagePath} className="big_image" />
                        </Col>
                        <Col xs={12} md={6}>
                        <Card.Title className="text-center">{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        {/* && operator here is an alternative to an if statement. If movie.Genre.Name exists, then it will render the Genre section. If it doesn't exist, it will skip */}
                        {movie.Genre.Name && (
                            <Card.Text className="genre_heading"><span className="genre_title">Genre: </span><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></Card.Text>
                        )}
                        {movie.Director.Name && (
                            <Card.Text className="director_heading"><span className="director_title">Directed by </span><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></Card.Text>
                        )}
                        <Button onClick={() => onBackClick(null)} varient="link">Back</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

// Set the propTypes property on the MovieView to an object that in turn contains a movie object which specifies the type of information displayed on the movie-view page
MovieView.propTypes = {
    movie: PropTypes.shape({
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
    }),
    onBackClick: PropTypes.func.isRequired
};