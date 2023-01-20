import React from 'react';
import s from "./Users.module.css";
import userIcon from "../../assets/images/user.png";
import {UsersDataType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";

type UserType = {

    users: UsersDataType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

export const User = (props: UserType) => {
    let user = props.users;
    return (

         <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userIcon} className={s.userPhoto}/>
                </NavLink>
            </div>
    <div>
    {user.followed ?
        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
            props.unfollow(user.id)


        }}>Unfollow</button>
        : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {

        props.follow(user.id)


        }}>Follow</button>}
    </div>
    </span>
                <span>
    <div>{user.name}</div>
    <div>{user.status}</div>
    </span>
                <span>
    <div>{"u.location.country"}</div>
    <div>{"u.location.city"}</div>
    </span>
            </div>

    )
}