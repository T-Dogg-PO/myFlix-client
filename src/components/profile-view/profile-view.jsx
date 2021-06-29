// Import React into this file
import React from 'react';
// Import axios (a library for making ajax requests from our database)
import axios from 'axios';

// Import prop-types, which will validate the data of props passed between different components
import PropTypes from 'prop-types';

// Import the scss file for this view
import './profile-view.scss';


export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: []
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
    }

    getUserDetails(token) {
        axios.get(`https://t-dogg-movies-api.herokuapp.com/users/${this.props.user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            this.setState({
                userDetails: response.data
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        const { user, onBackClick} = this.props;

        console.log(user)
        console.log(this.state.userDetails)

        return (
            <div>{user}
                <li>{this.state.userDetails.Username}</li>
                <li>{this.state.userDetails.Email}</li>
            </div>
        );
    }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
    user: PropTypes.string.isRequired,
    // userDetails: PropTypes.shape({
    //     Username: PropTypes.string.isRequired,
    //     Password: PropTypes.string.isRequired,
    //     Email: PropTypes.string.isRequired,
    //     Birthday: PropTypes.date,
    //     FavouriteMovies: PropTypes.arrayOf(PropTypes.string)
    // })
};