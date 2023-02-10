import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom"
import {initializeApp} from "./redux/appReducer";
import {useAppDispatch, useAppSelector} from "./redux/redux-store";
import {UsersPage} from './components/Users/UsersPage';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {HeaderPage} from './components/Header/HeaderPage';
import {Spin} from 'antd';
import {LoginPage} from './components/Login/LoginPage';


export const App: React.FC = () => {
    const dispatch = useAppDispatch()


    const initialized = useAppSelector(state => state.app.initialized)
    const myId = useAppSelector(state => state.auth.userId)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Spin tip="Loading" size="large" style={{margin: " 25% 50%"}}>
        </Spin>
    }

        return (
                <div className='app-wrapper'>
                    <HeaderPage/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                        <Route path='/' element={<ProfileContainer/>}/>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                        <Route path='/dialogs' element={<DialogsContainer/>}/>
                        <Route path='/users' element={<UsersPage pageTitle={'Samurais'}/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='*' element={()=> <div>404 NOT FOUND</div>}/>
                    </Routes>
                    </div>
                </div>
        );
    }


