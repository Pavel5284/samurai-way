import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import  { App } from './App';
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

let rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>

      ,
        document.getElementById('root')

    );
}


store.subscribe(rerenderEntireTree);
rerenderEntireTree();


