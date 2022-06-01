import React from 'react';
import s from "./Users.module.css";
import userIcon from "../../assets/images/user.png";
import {UsersDataType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../api/api";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersDataType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
   //toggleIsFollowingProgress: (followingInProgress: boolean, userId: number) => void
    followingInProgress: Array<number>
}

export const Users = (props: UsersType) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span key={p} className={props.currentPage === p && s.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
        <span>
            <div>
                <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userIcon} className={s.userPhoto}/>
                </NavLink>
            </div>
    <div>
    {u.followed ?
        <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
            props.unfollow(u.id)


        }}>Unfollow</button>
        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

        props.follow(u.id)


        }}>Follow</button>}
    </div>
    </span>
                <span>
    <div>{u.name}</div>
    <div>{u.status}</div>
    </span>
                <span>
    <div>{"u.location.country"}</div>
    <div>{"u.location.city"}</div>
    </span>
            </div>)
        }
    </div>
}