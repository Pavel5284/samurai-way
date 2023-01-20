import React from 'react';
import {UsersDataType} from "../../redux/usersReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

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
        <Paginator totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize} currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
        />
        <div>
            {
                props.users.map(u => <User key={u.id}
                                           users={u}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
                                           followingInProgress={props.followingInProgress}/>)
            }
        </div>
    </div>
}