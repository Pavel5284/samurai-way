import {ActionsDialogsType} from "./dialogsReducer";
import {ProfileType, UserPhotosType} from "./state";
import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkDispatchType, ThunkType} from "./usersReducer";
import {stopSubmit} from "redux-form";
import {setAppError} from "./appReducer";


export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type ActionsProfileType =
    AddPostActionType
    | DeletePostActionType
    | ActionsDialogsType
    | SetUserProfileActionType
    | SetStatusActionType
    | SetErrorActionType
    | SavePhotoActionType
    | SaveProfileActionType


export type AddPostActionType = ReturnType<typeof addPostAC>
export type DeletePostActionType = ReturnType<typeof deletePostAC>
export type SetUserProfileActionType = ReturnType<typeof setUserProfileAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SavePhotoActionType = ReturnType<typeof savePhotoAC>
export type SaveProfileActionType = ReturnType<typeof saveProfileAC>

const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SET_ERROR = 'profile/SET_ERROR'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const SAVE_PROFILE = 'profile/SAVE_PROFILE'

export const addPostAC = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    } as const
}
export const deletePostAC = (postId: number) => {
    return {
        type: DELETE_POST,
        postId
    } as const
}
export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setStatusAC = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: SET_ERROR,
        error
    } as const
}
export const savePhotoAC = (photos: UserPhotosType) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    } as const
}
export const saveProfileAC = (profile: ProfileType) => {
    return {
        type: SAVE_PROFILE,
        profile
    } as const
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await profileAPI.getStatus(userId)

    dispatch(setStatusAC(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
    }
    } catch (error: any) {
        dispatch(setAppError(error.message))
    }
}
export const savePhoto = (file: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: ThunkDispatchType, getState: any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        dispatch(setErrorAC(response.data.messages[0]))
        return Promise.reject(response.data.messages[0])
    }
}


type InitialStateType = typeof initialState

const initialState = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: "Hi, it's me", likesCount: 12},
        {id: 2, message: 'This is first post', likesCount: 8},
        {id: 3, message: 'This is second post', likesCount: 10}
    ],
    profile: null as null| ProfileType,
    status: "",
    formError: ''
}


const profileReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)};

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
            case SET_ERROR:
            return {
                ...state,
                formError: action.error
            }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile!, photos: action.photos}
            }
        }
        case SAVE_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}


export default profileReducer;