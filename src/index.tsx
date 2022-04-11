import React from 'react';
import './index.css';
import {store} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let rerenderEntireTree = () => {
    ReactDOM.render(
        <App store={store} /*addPost={store.addPost} updateNewPostText={store.updateNewPostText}*//>,
        /*<App posts={appState.profilePage.posts} dialogs={appState.messagesPage.dialogs} messages={appState.messagesPage.messages}/>,*/
        document.getElementById('root')
    );
}





store.subscribe(rerenderEntireTree);
rerenderEntireTree();


