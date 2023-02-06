import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom"
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {AppInitialStateType, initializeApp} from "./redux/appReducer";
import store, {AppStateRootType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import { LoginPage } from './components/Login/LoginPage';
import {notification} from "antd";
import { UsersPage } from './components/Users/UsersPage';

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


type MapStatePropsType = {
    initialized: boolean,
    globalError: string | null
}

type MapDispatchToProps = {
    initializeApp: () => void
}

type AppPropsType = MapStatePropsType & MapDispatchToProps

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert('Some error occured')
        console.error(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    openNotificationWithIcon = (type: 'error') => {
        notification[type]({
            message: this.props.globalError
        })
    }

    componentDidUpdate() {
        if (this.props.globalError) {
            this.openNotificationWithIcon('error')
        }
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
                        <Switch>
                        <Route exact path='/' render={withSuspense(ProfileContainer)}/>
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/users' render={() => <UsersPage pageTitle={'Samurais'}/>}/>
                        <Route path='/login' render={()=> <LoginPage/>}/>
                        <Route path='*' render={()=> <div>404 NOT FOUND</div>}/>
                    </Switch>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: AppStateRootType): MapStatePropsType => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError
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

