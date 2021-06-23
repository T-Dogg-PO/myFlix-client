// Import React
import React from 'react';
import ReactDOM from 'react-dom';
// Import the React Bootstrap components that will be used in this view
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
// Import Components
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <Navbar expand="lg" className="mb-4" sticky="top">
                    <Navbar.Brand href="#" className="ml-4">
                        <Image src="https://i.imgur.com/ykYgWv5.png" alt="myFlix logo" className="d-inline-block align-top" />
                    </Navbar.Brand>
                </Navbar>
                <Container>
                    <MainView />
                </Container>
            </div>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);