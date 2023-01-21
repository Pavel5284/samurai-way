import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import SamuraiJSApp from './App';
import store from "./redux/redux-store";

let rerenderEntireTree = () => {
    ReactDOM.render(
       <SamuraiJSApp/>
      ,
        document.getElementById('root')

    );
}


store.subscribe(rerenderEntireTree);
rerenderEntireTree();


