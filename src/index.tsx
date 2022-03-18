import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {appState} from "./redux/state";





ReactDOM.render(
    <App posts={appState.profilePage.posts} dialogs={appState.messagesPage.dialogs} messages={appState.messagesPage.messages}/>,
  document.getElementById('root')
);