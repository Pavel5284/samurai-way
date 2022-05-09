export type UsersDataType = {
    id: number
    photoURL: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
type LocationType = {
    city: string
    country: string
}

export type ActionsType = FollowActionType | UnfollowActionType | SetUsersActionType


export type FollowActionType = ReturnType<typeof followAC>
export type UnfollowActionType = ReturnType<typeof unfollowAC>
export type SetUsersActionType = ReturnType<typeof setUsersAC>


type InitialStateType = {
    users: UsersDataType[]
}

const initialState:  InitialStateType = {
        users: [
            /*{id: 1, photoURL: 'https://oir.mobi/uploads/posts/2019-12/1576864907_1-2.jpg',
                followed: false, fullName: 'Dmitry', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
            {id: 2, photoURL: 'https://oir.mobi/uploads/posts/2019-12/1576864907_1-2.jpg',
                followed: true, fullName: 'Sasha', status: 'Hello', location: {city: 'Moskow', country: 'Russia'}},
            {id: 3, photoURL: 'https://oir.mobi/uploads/posts/2019-12/1576864907_1-2.jpg',
                followed: false, fullName: 'Andrew', status: 'Hello', location: {city: 'Kiev', country: 'Ukraine'}}
       */ ]

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
            return {...state, users: [...state.users, ...action.users]}
        }

        default:
            return state;
    }
}





export default usersReducer;