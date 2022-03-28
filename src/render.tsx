import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, AppStatePropsType} from "./redux/state";

export let rerenderEntireTree = (appState: AppStatePropsType) => {
    ReactDOM.render(
        <App state={appState} addPost={addPost}/>,
        /*<App posts={appState.profilePage.posts} dialogs={appState.messagesPage.dialogs} messages={appState.messagesPage.messages}/>,*/
        document.getElementById('root')
    );
}


