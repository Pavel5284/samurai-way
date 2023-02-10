import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ResponseType, ResultCodesEnum, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {ActionsTypes, AppStateRootType} from "./redux-store";

export type UsersDataType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
}
export type PhotosType = {
    small: string | null
    large: string | null
}
type LocationType = {
    city: string
    country: string
}
export type FilterType = typeof initialState.filter

export type ThunkType<A extends Action = Action> = ThunkAction<void, AppStateRootType, unknown, ActionsTypes | A>
export type ThunkDispatchType = ThunkDispatch<AppStateRootType, unknown, ActionsTypes>

export type ActionsUserType = FollowActionType | UnfollowActionType | SetUsersActionType |
    SetCurrentPageActionType | SetUsersTotalCountActionType | ToggleIsFetchingActionType |
    ToggleIsFollowingProgressActionType | SetUsersFilterActionType


export type FollowActionType = ReturnType<typeof followSuccessAC>
export type UnfollowActionType = ReturnType<typeof unfollowSuccessAC>
export type SetUsersActionType = ReturnType<typeof setUsersAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetUsersFilterActionType = ReturnType<typeof setUsersFilterAC>
export type SetUsersTotalCountActionType = ReturnType<typeof setTotalUsersCountAC>
export type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetchingAC>
export type ToggleIsFollowingProgressActionType = ReturnType<typeof toggleIsFollowingProgressAC>


export type InitialStateType = typeof initialState

const initialState = {
    users: [] as UsersDataType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    isFetching: true,
    followingInProgress: [] as Array<number>,
    portionSize: 5
}

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_USERS_FILTER = 'users/SET_USERS_FILTER'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'


export const followSuccessAC = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}

export const unfollowSuccessAC = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}
export const setUsersAC = (users: UsersDataType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}
export const setUsersFilterAC = (filter: FilterType) => {
    return {
        type: SET_USERS_FILTER,
        payload: filter
    } as const
}
export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
}
export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
}
export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const
}

const usersReducer = (state: InitialStateType = initialState, action: ActionsUserType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_FILTER: {
            return {...state, filter: action.payload}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setUsersFilterAC(filter))
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(setCurrentPageAC(currentPage));
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));

    }
}

export const followUnfollowFlow = async (dispatch: ThunkDispatchType, userId: number,
                                         apiMethod: (userId: number) => Promise<ResponseType>,
                                         actionCreater: (userId: number) => FollowActionType | UnfollowActionType) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    const response = await apiMethod(userId)

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreater(userId))
    }
    dispatch(toggleIsFollowingProgressAC(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
       await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccessAC)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccessAC)

    }
}


export default usersReducer;