// Import React
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import Components
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

// Create the store for Redux
const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            // Wrap entire app in Provider, which means the store will be available anywhere in the app
            <Provider store={store}>
                <div className="my-flix">
                    <MainView />
                </div>
            </Provider>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);