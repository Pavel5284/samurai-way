export type UsersDataType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
}
export type PhotosType = {
    small: string
    large: string
}
type LocationType = {
    city: string
    country: string
}

export type ActionsType = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType | SetUsersTotalCountActionType | ToggleIsFetchingActionType


export type FollowActionType = ReturnType<typeof follow>
export type UnfollowActionType = ReturnType<typeof unfollow>
export type SetUsersActionType = ReturnType<typeof setUsers>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
export type SetUsersTotalCountActionType = ReturnType<typeof setTotalUsersCount>
export type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>


type InitialStateType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

const initialState:  InitialStateType = {
        users: [ ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true
}

export const follow = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}

export const unfollow = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsers = (users: UsersDataType[]) => {
    return {
        type: 'SET_USERS',
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return{
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return{
        type: 'SET_TOTAL_USERS_COUNT',
        totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return{
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const
}

const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case "SET_USERS": {
            return {...state, users: action.users}
        }

        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.totalUsersCount }
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching }
        }

        default:
            return state;
    }
}





export default usersReducer;