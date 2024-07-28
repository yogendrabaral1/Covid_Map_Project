import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import MapReducer from './MapComponent/mapreducer';
import SidecardReducer from './SideComponent/SidecardReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const allReducer = combineReducers({ MapReducer, SidecardReducer });
const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
