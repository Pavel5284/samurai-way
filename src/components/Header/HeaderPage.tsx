import Button from 'antd/es/button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";
import { Layout, theme } from 'antd';

const {Header} = Layout

export const HeaderPage = () => {
    const dispatch= useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.login)
    const logoutHandler = () => {
        dispatch(logout())
    }

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <div className={s.header}>
            <Header style={{background: colorBgContainer}}>
                <div className={s.loginBlock}>
                    {isAuth
                        ? <div className={s.header__login}>{login} - <Button type={'default'} onClick={logoutHandler}>Log out</Button></div>
                        :  <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </Header>
        </div>

)
}

