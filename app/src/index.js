import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import sagaMiddlwareFactory from 'redux-saga';
import App from 'containers/App';
import reducers from "reducers";
import sagas from "sagas";
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import './index.css';

const sagaMiddlware = sagaMiddlwareFactory(sagas);
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddlware)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

sagaMiddlware.run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
