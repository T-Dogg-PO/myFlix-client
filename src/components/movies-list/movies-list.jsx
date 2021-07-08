import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

// mapStateToProps will connect the store to this components props for ease of use
const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

// Function/view for the entire list of Movies
function MoviesList(props) {
    // Declare our variables (including the props that we got from the store)
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    // Filter the movies array if the search bar has been filled out
    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    // Return both the search bar (VisibilityFilterInput) and the list of (filtered) movies
    return <>
        <Col md={12} style={{ margin: '1em' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map(m => (
            <Col lg={3} md={4} sm={6} key={m._id} className="my-2">
                <MovieCard movieData={m} />
            </Col>
        ))}
    </>;
}

// Connect will connect the component to the store
export default connect(mapStateToProps)(MoviesList);