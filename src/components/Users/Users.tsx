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
    followingInProgress: Array<number>
    portionSize: number
}

export const Users = (props: UsersType) => {

    return <div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   portionSize={props.portionSize}
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