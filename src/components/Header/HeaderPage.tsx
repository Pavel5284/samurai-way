import Button from 'antd/es/button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";
import {Avatar, Layout, theme} from 'antd';

const {Header} = Layout

export const HeaderPage = () => {
    const dispatch= useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.login)
    const userAvatar = useAppSelector(state => state.profile.profile?.photos.small)
    const logoutHandler = () => {
        dispatch(logout())
    }

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <div className={s.header}>
            <Header >
                <div className={s.loginBlock}>
                    {isAuth
                        ? <div className={s.header__login}>
                            <Avatar style={{  verticalAlign: 'middle' }}
                                    src={userAvatar}
                                    size="large"/>
                            {login} - <Button type={'default'} onClick={logoutHandler}>Log out</Button></div>
                        :  <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </Header>
        </div>

)
}

