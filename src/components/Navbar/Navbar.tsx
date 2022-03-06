import React from "react";
import s from './Navbar.module.css';
console.log(s);
export const Navbar = () => {
    return (
    <nav className={s.nav}>
        <ul className={s.items}>
            <li className={s.item}>
                <a href="#">Profile</a>
            </li>
            <li className={s.item}>
                <a href="#">Messages</a>
            </li>
            <li className={s.item}>
                <a className={`${s.item__link} ${s.active}`} href="#">News</a>
            </li>
            <li className={s.item}>
                <a href="#">Music</a>
            </li>
            <li className={s.item}>
                <a href="#">Settings</a>
            </li>

        </ul>
    </nav>
    )
}