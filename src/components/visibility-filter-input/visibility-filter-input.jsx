import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

// Function for displaying the search bar, that on change will trigger the setFilter action to update the store (which is then used in MovieList)
function VisibilityFilterInput(props) {
    return <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
    />;
}

// This connect function connects the setFilter action to this component (shorthand for a mapDispatchToProps function)
export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);