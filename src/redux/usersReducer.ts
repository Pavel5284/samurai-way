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

export type ActionsType = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType | SetUsersTotalCountActionType


export type FollowActionType = ReturnType<typeof followAC>
export type UnfollowActionType = ReturnType<typeof unfollowAC>
export type SetUsersActionType = ReturnType<typeof setUsersAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetUsersTotalCountActionType = ReturnType<typeof setUsersTotalCountAC>


type InitialStateType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

const initialState:  InitialStateType = {
        users: [ ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1

}

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsersAC = (users: UsersDataType[]) => {
    return {
        type: 'SET_USERS',
        users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return{
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const
}
export const setUsersTotalCountAC = (totalUsersCount: number) => {
    return{
        type: 'SET_TOTAL_USERS_COUNT',
        totalUsersCount
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

        default:
            return state;
    }
}





export default usersReducer;