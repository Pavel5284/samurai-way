import React, {useEffect} from 'react';
import {FilterType, requestUsers, follow, unfollow} from "../../redux/usersReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {FriendFormType, UsersSearch} from "./UsersSearch";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";
import * as queryString from "querystring";
import {Navigate, useNavigate, useSearchParams} from 'react-router-dom';

type UsersType = {}

type QueryParamsType = {
    term?: string,
    page?: string,
    friend?: string
}

export const Users: React.FC<UsersType> = (props) => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const currentPageSize = useAppSelector(getPageSize)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const termQuery = searchParams.get('term') || ''
    const friendQuery = (searchParams.get('friend') || 'all') as FriendFormType

    const filter = {
        term: termQuery,
        friend: (friendQuery === 'friends')
    }

    useEffect(() => {
        dispatch(requestUsers(1, currentPageSize, filter))
    }, [termQuery, friendQuery])


    const onPageChanged = (pageNumber: number, pageSize: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        setSearchParams({term: filter.term, friend: `${filter.friend}`})

        dispatch(requestUsers(1, currentPageSize, filter))
    }

    const followHandler = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowHandler = (userId: number) => {
        dispatch(unfollow(userId))
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return <div>

        <UsersSearch setSearchParams={setSearchParams}
                     friendQuery={friendQuery}
                     termQuery={termQuery}
        />
        <Paginator totalUsersCount={totalUsersCount}
                   pageSize={currentPageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   currentPageSize={currentPageSize}

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

