import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import {Navbar} from "./components/Navbar/Navbar";
import { Profile} from './components/Profile/Profile';
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom"
import { AppStatePropsType} from "./redux/state";



type AppPropsType = {
    state: AppStatePropsType
    addPost: (postMessage: string) => void

}

const App = (props: AppPropsType) => {
  return (
      <BrowserRouter>
      <div className='app-wrapper'>
         <Header />
          <Navbar />
          <div className='app-wrapper-content'>
              <Route path='/dialogs' render={() => <Dialogs dialogs={props.state.messagesPage.dialogs} messages={props.state.messagesPage.messages}/>}/>
              <Route path='/profile' render={() =>
                  <Profile
                      posts={props.state.profilePage.posts}
                      addPost={props.addPost}
                  />}/>
      </div>
</div>
</BrowserRouter>
  );
}





export default App;
