import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateRootType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {message} from "antd";
import { ThunkType } from "./usersReducer";

export type ActionsAuthType = SetUserDataActionType | GetCaptchaUrlActionType


export type SetUserDataActionType = ReturnType<typeof setAuthUserDataAC>
export type GetCaptchaUrlActionType = ReturnType<typeof getCaptchaUrlAC>


export type AutInitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

const initialState: AutInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

export const setAuthUserDataAC = (payload: AutInitialStateType | null) => {
    return {
        type: SET_USER_DATA,
        payload
    } as const
}
export const getCaptchaUrlAC = (captchaUrl: string | null) => {
    return {
        type: GET_CAPTCHA_URL,
        payload: {captchaUrl}
    }
}
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC({...response.data.data, userId: response.data.data.id, isAuth: true}));
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateRootType,
    unknown, any>) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}))
    }

}

export const getCaptchaUrl = () => async (dispatch: ThunkDispatch<AppStateRootType, unknown, any>) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlAC(captchaUrl))
}

export const logout = () => async (dispatch: Dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC({
            userId: null,
            email: null,
            login: null,
            isAuth: false,
            captchaUrl: null
        }));
    }
}


const autReducer = (state: AutInitialStateType = initialState, action: ActionsAuthType): AutInitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}


export default autReducer;