// Import React
import React from 'react';
// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import necessary Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Import the scss file for this view
import './director-view.scss'

// Export the DirectorView class that extends the component template React.Component
export class DirectorView extends React.Component {
    render() {
        // Get the director and the onBackClick details from this objects props
        const { director, onBackClick } = this.props;
        // Return a single div (director-view) that contains details about the director in question
        return (
            <Card border="dark">
                <Card.Body>
                    <Card.Title className="text-center">{director.Name}</Card.Title>
                    <Card.Text>{director.Bio}</Card.Text>
                    {/* Only display the Birth/Death dates if they exist (this was necessary because of the Intl.DateTimeFormat conversion, to use that method the date fiels for Director could not be empty) */}
                    {director.Birth && (
                        <Card.Text><span className="customHeading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(director.Birth))}</Card.Text>
                    )}
                    {director.Death && (
                        <Card.Text><span className="customHeading">Date of Death: </span>{Intl.DateTimeFormat().format(new Date(director.Death))}</Card.Text>
                    )}
                    <Button className="mx-auto director-view-btn" onClick={() => onBackClick(null)} varient="link">Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

// Set the propTypes property on the DirectorView to an object that in turn contains a director object which specifies the type of information displayed on the director-view page
DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string
    }),
    onBackClick: PropTypes.func.isRequired
};