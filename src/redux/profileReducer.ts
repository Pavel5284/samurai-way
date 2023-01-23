import {SendMessageActionType} from "./dialogsReducer";
import {ProfileType, UserPhotosType} from "./state";
import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";

/*export type ProfilePageType = {
    posts: PostDataType[]
    newPostText: string
}*/
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type ActionsType =
    AddPostActionType
    | DeletePostActionType
    | SendMessageActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | SavePhotoActionType


export type AddPostActionType = ReturnType<typeof addPostAC>
export type DeletePostActionType = ReturnType<typeof deletePostAC>
export type SetUserProfileActionType = ReturnType<typeof setUserProfileAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
export type SavePhotoActionType = ReturnType<typeof savePhotoAC>

export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText: newPostText
    } as const
}
export const deletePostAC = (postId: number) => {
    return {
        type: 'DELETE-POST',
        postId
    } as const
}
export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: "SET_USER_PROFILE",
        profile
    } as const
}
export const setStatusAC = (status: string) => {
    return {
        type: "SET_STATUS",
        status
    } as const
}
export const savePhotoAC = (photos: UserPhotosType) => {
    return {
        type: "SAVE_PHOTO_SUCCESS",
        photos
    } as const
}

export const getUserProfile = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data));
}
export const getStatus = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileAPI.getStatus(userId)

    dispatch(setStatusAC(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export const savePhoto = (file: string) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos))
    }
}


type InitialStateType = {
    posts: PostDataType[],
    profile: null | ProfileType
    status: string
}

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, it's me", likesCount: 12},
        {id: 2, message: 'This is first post', likesCount: 8},
        {id: 3, message: 'This is second post', likesCount: 10}
    ],
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
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case 'DELETE-POST':
            return {...state, posts: state.posts.filter(p => p.id != action.postId)};

        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case "SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile!, photos:action.photos}
            }
        }
        default:
            return state;
    }
}


export default profileReducer;