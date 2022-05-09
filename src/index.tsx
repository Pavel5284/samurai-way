import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>


            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


store.subscribe(rerenderEntireTree);
rerenderEntireTree();


