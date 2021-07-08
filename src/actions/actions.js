// actions.js will define what interactions the app is going to support.
// Based on my architectural diagram from 3.7, the interactions will be as follows:
/*
Log a user in
Log a user out
Populate the list of all movies
Add movie to a users favourites list
Remove a movie from a users favourites list
Add a new user
Edit user details
Delete a user from the database
*/

// Explicitly name the potential actions, and export them so that we can call them wherever we want to perform actions
// SET_MOVIES initializes the movies list with movies
export const SET_MOVIES = 'SET_MOVIES';
// SET_FILTER sets the filter to filter the movies list with a search function
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

// Action creators (a pure JavaScript function that returns the action itself, which has a type and data to update the state)
export function setMovies(value) {
    console.log('setMovies action triggered');
    return {
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    console.log('setUser action triggered');
    return {
        type: SET_USER,
        value
    };
}