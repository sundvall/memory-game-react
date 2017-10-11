import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/index.js';
import './index.css';
import App from './components/App.js';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const rootElement = document.getElementById('root');
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement,
    );
};
render();
store.subscribe(render);
registerServiceWorker();
