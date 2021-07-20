// Import React
import React from 'react';
// Import axios (a library for making ajax requests from our database)
import axios from 'axios';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Import the Link component from react-router-dom for the View Movie Details button
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// Import necessary Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import the scss file for this view
import './movie-view.scss';

// Export the MovieView class that extends the component template React.Component
export class MovieView extends React.Component {
    constructor(props) {
        super(props);
        // Create state variables that will be used to add/remove a movie from a users favourites list
        this.state = {
            favouriteMovies: [],
            userDetails: []
        }

        // Bind these additional functions that will get called by onClick events to 'this'
        this.addFavourite = this.addFavourite.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    // During componentDidMount() get the user's details (for displaying whether this movie is a favourite or not)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
    }

    // getUserDetails function for making a request to the server for the users details
    getUserDetails(token) {
        let user = localStorage.getItem('user');
        axios.get(`https://t-dogg-movies-api.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            console.log(response.data)
            // Use the response to set the user details in the state variables
            this.setState({
                userDetails: response.data,
                favouriteMovies: response.data.FavouriteMovies
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Function for adding this movie to a users favourites list. Makes a post request to the server using information passed in through the props
    addFavourite() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        // I'm not sure why I need the first {} (before the headers). but without those empty brackets all my requests returned unauthorized
        axios.post(`https://t-dogg-movies-api.herokuapp.com/users/${user}/Movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            // window.open refreshes the page to make sure this movie is correctly displaying as a favourite
            // window.open(`/movies/${this.props.movie._id}`, '_self');
            this.getUserDetails(token);
            // this.props.history.push(`/movies/${this.props.movie._id}`);
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Function for removing this movie from a users favourites list. Makes a delete request to the server using information passed in through the props
    removeFavourite() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.delete(`https://t-dogg-movies-api.herokuapp.com/users/${user}/Movies/${this.props.movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            // window.open refreshes the page to make sure this movie is correctly displaying as not a favourite
            // window.open(`/movies/${this.props.movie._id}`, '_self');
            this.getUserDetails(token);
            // this.props.history.push(`/movies/${this.props.movie._id}`);
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        // Get the movie and the onBackClick details from this objects props
        const { movie, onBackClick, user } = this.props;

        // This section of code sets a flag which will show a add/remove favourites button depending on if the movie can be found in the users favourites
        let tempArray = user.FavouriteMovies;
        let isFavouriteNew = false;
        if (tempArray && tempArray.includes(movie._id)) {
            isFavouriteNew = true;
        } else {
            isFavouriteNew = false;
        }

        // if (tempArray === undefined) {
        //     tempArray = [];
        // }
        // if (tempArray.includes(movie._id)) {
        //     isFavouriteNew = true;
        // } else {
        //     isFavouriteNew = false;
        // };
        // console.log(isFavouriteNew)    

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
                            {/* Use flag defined above to determine if we need an add or remove from favourites button */}
                            {isFavouriteNew ? (
                                <Button className="float-right" variant="danger" onClick={this.removeFavourite}>
                                    Remove from Favourites
                                </Button>
                            ) : (
                                <Button className="float-right" variant="success" onClick={this.addFavourite}>
                                    Add to Favourites
                                </Button>
                            )}
                            
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

// mapStateToProps to connect the store to props which van be used in this comonent
const mapStateToProps = state => {
    const { user } = state;
    return { user };
};

// connect function to link the above function to the MovieView
export default connect(mapStateToProps)(MovieView);