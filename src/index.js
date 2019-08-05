import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { SearchRobots, requestRobots } from './reducers';

// middleware
import { createLogger } from 'redux-logger';

// middleware para async 
import thunkMiddleware from 'redux-thunk';

// Containers
import App from './containers/App';

// Para clases Css
import './index.css';
import 'tachyons';

const logger = createLogger();

// Se combinan los reducers para agregarlos al store
const rootReducers = combineReducers({ SearchRobots, requestRobots });

// Crear store con los reducers y usar los middlewars
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('root'));



