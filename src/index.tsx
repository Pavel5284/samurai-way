import React from 'react';
import './index.css';
import {rerenderEntireTree} from "./render";
import {appState} from "./redux/state";



rerenderEntireTree(appState);

