// Reducers will actually modify the state for each action that has been defined.
// Every time an action is dispatched the reducers will be called, and the switch/case syntax will determine if the reducer is concerned by the given action

// Import combineReducers, which will group all the reducers together into a single combined reducer
import { combineReducers } from 'redux';

// Import the actions
import { SET_FILTER, SET_MOVIES } from '../actions/actions';

// Each reducer will take the state and an action. A state is given a default value incase the state is undefined
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        // If the reducer is unconcerned with the action, then return the state that it was given
        default:
            return state;
    }
}


function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached');
            return action.value;
        default:
            return state;
    }
}

// All of the user actions will be under the same reducer (e.g. add a user, delete a user, modify a user, etc), but will be handled by the switch/case syntax


// A combined reducer to group all the reducers together (and then only passes them the state that they're concerned with)
function moviesApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}

export default moviesApp;