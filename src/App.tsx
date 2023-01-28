import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {HashRouter, Route, withRouter} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {AppInitialStateType, initializeApp} from "./redux/appReducer";
import store, {AppStateRootType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import { LoginForm } from './components/Login/Login';

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


type MapStatePropsType = {
    initialized: boolean,
}

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
            return (
                <Preloader/>
                )
        }
        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>

                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={withSuspense(LoginForm)}/>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: AppStateRootType): AppInitialStateType => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(withRouter,
    connect<MapStatePropsType, MapDispatchToProps, {}, AppStateRootType>
    (mapStateToProps, {initializeApp}))(App);
const SamuraiJSApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default SamuraiJSApp

