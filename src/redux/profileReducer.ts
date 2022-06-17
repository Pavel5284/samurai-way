import {ChangeNewMessageActionType, SendMessageActionType} from "./dialogsReducer";
import {strict} from "assert";
import {ProfileType} from "./state";
import {profileAPI, usersAPI} from "../api/api";
import {Action, Dispatch} from "redux";

/*export type ProfilePageType = {
    posts: PostDataType[]
    newPostText: string
}*/
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type ActionsType = AddPostActionType | ChangeNewTextActionType | ChangeNewMessageActionType | SendMessageActionType | SetUserProfileActionType | SetStatusActionType


export type AddPostActionType = ReturnType<typeof addPost>
export type ChangeNewTextActionType = ReturnType<typeof changeNewText>
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export type SetStatusActionType = ReturnType<typeof setStatus>
// export type GetUserProfileActionType = ReturnType<typeof getUserProfile>

export const addPost = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText: newPostText
    } as const
}

export const changeNewText = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: "SET_USER_PROFILE",
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: "SET_STATUS",
        status
    } as const
}
export const getUserProfile = (userId: number) => (dispatch: Dispatch<ActionsType>) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    });
}
export const getStatus = (userId: number) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.getStatus(userId)
        .then(response => {
        dispatch(setStatus(response.data))
    })
}
export const updateStatus = (status: string) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}

type InitialStateType = {
    posts: PostDataType[],
    newPostText: string
    profile: null | ProfileType
    status: string
}

const initialState:  InitialStateType = {
        posts: [
            {id: 1, message: "Hi, it's me", likesCount: 12},
            {id: 2, message: 'This is first post', likesCount: 8},
            {id: 3, message: 'This is second post', likesCount: 10}
        ],
        newPostText: '',
        profile: null as ProfileType | null,
        status: ""

}


const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };


        case 'UPDATE-NEW-POST-TEXT':
            return {
                ...state,
                newPostText: action.newText
            };

        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SET_STATUS':
            return {
                ...state,
                status:action.status
            }
        default:
            return state;
    }
}





export default profileReducer;