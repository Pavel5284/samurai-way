import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

export type HeaderPropsType = {
    isAuth: boolean,
    email: string | null,
    login: string | null
    logout: () => void
}

export const Header = (props: HeaderPropsType) => {
    return (
    <header className={s.header}>
        <img src="https://i.pinimg.com/originals/2e/d6/46/2ed6463a614f7a4ff5736454ac7290f8.png" alt="logo"/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                :  <NavLink to={'/login'}>Login</NavLink>}
            {props.isAuth && props.email && props.email }
        </div>
    </header>
)
}

