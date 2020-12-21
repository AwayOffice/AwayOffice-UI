import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import reducer from './reducers/';
import thunk from 'redux-thunk';
//import store from './store'

React.icons = icons

const initialState = {
	loading: false,
	loaded: false,
	token: '',
	error: null,
};

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, initialState, 
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

//export default store;

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
