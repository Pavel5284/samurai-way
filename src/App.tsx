import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from './components/Profile/Profile';
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom"
import {AppStatePropsType, StoreType} from "./redux/state";


type AppPropsType = {
    store: StoreType
    /*addPost: () => StoreType
    updateNewPostText: (newText: string) => void*/

}

const App: React.FC<AppPropsType> = (props) => {
    const state = props.store.getState();
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs
                        messagesPage={state.messagesPage}
                       // dialogs={props.store.getState().messagesPage.dialogs}
                       // messages={props.store.getState().messagesPage.messages}
                       // newMessageBody={props.store.getState().messagesPage.newMessageBody}
                        dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/profile' render={() =>
                        <Profile
                            profilePage={state.profilePage}
                            /* addPost={props.store.addPost.bind(props.store)}
                             updateNewPostText={props.store.updateNewPostText.bind(props.store)}*/
                            dispatch={props.store.dispatch.bind(props.store)}
                        />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
