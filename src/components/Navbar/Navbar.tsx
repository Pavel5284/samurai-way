import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
    <nav className={s.nav}>
        <ul className={s.items}>
            <li className={s.item}>
                <NavLink to="/profile" className={({isActive}) => isActive ? s.active : undefined}>Profile</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="/dialogs" className={({isActive}) => isActive ? s.active : undefined}>Messages</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="/users" className={({isActive}) => isActive ? s.active : undefined}>Users</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="/news" className={({isActive}) => isActive ? s.active : undefined}>News</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="/music" className={({isActive}) => isActive ? s.active : undefined}>Music</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="settings" className={({isActive}) => isActive ? s.active : undefined}>Settings</NavLink>
            </li>

        </ul>
    </nav>
    )
}