import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateRootType} from "./redux-store";

export type ActionsType = SetUserDataActionType


export type SetUserDataActionType = ReturnType<typeof setAuthUserData>


export type AutInitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

const initialState: AutInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}


export const setAuthUserData = (payload: AutInitialStateType | null) => {
    return {
        type: 'SET_USER_DATA',
        payload
    } as const
}
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData({...response.data.data, isAuth: true}));
            }
        })
}


export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<AppStateRootType,
    unknown, any>) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
        })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData({
                    userId: null,
                    email: null,
                    login: null,
                    isAuth: false
                }));
            }
        })
}


const autReducer = (state: AutInitialStateType = initialState, action: ActionsType): AutInitialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }


        default:
            return state;
    }
}


export default autReducer;