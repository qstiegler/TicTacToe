import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './reducers';
import TicTacToe from './containers/TicTacToe';

const configureStore = (initialState) => {
    const store = createStore(reducer, initialState, compose(
        window.devToolsExtension ? window.devToolsExtension() : f => { return f; }
    ));

    return store;
};

const store = configureStore();

render(
    <Provider store={store}>
        <TicTacToe />
    </Provider>,
  document.getElementById('root')
);
