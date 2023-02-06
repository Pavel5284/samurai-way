import React, {useEffect} from 'react';
import {FilterType, requestUsers, follow, unfollow} from "../../redux/usersReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";

type UsersType = {}

export const Users: React.FC<UsersType> = (props) => {

    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const pageSize = useAppSelector(getPageSize)
    const filter = useAppSelector(getUsersFilter)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followHandler = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowHandler = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator totalUsersCount={totalUsersCount}
                   pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}

        />
        <div>
            {
                users.map(u => <User key={u.id}
                                           users={u}
                                           follow={followHandler}
                                           unfollow={unfollowHandler}
                                           followingInProgress={followingInProgress}/>)
            }
        </div>
    </div>
}

