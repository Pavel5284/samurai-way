import React, {ReactComponentElement, ReactElement, ReactNode} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer, {HeaderContainerOwnPropsType} from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {getAuthUserData} from "./redux/authReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppInitialStateType, initializeApp} from "./redux/appReducer";
import {AppStateRootType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

type MapDispatchToProps = {
    initializeApp: () => void
}

type AppPropsType = AppInitialStateType & MapDispatchToProps

class App extends React.Component<AppPropsType, {}> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if(!this.props.initialized){
            return
              <Preloader/>
        }
        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>

                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: AppStateRootType): AppInitialStateType => ({
    initialized: state.app.initialized
})

export default compose<JSX.Element | any>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);



