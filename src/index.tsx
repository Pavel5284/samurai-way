import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/redux-store";

let rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
        <App store={store} />

        </Provider>,
        document.getElementById('root')
    );
}





store.subscribe(rerenderEntireTree);
rerenderEntireTree();


