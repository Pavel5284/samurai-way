import {authAPI} from "../api/api";
import {Dispatch} from "redux";

export type ActionsType = SetUserDataActionType


export type SetUserDataActionType = ReturnType<typeof setAuthUserData>


export type AutInitialStateType = {
    userId: number,
    email: string,
    login: string,
    isAuth: boolean
}

const initialState: AutInitialStateType = {
    userId: 1,
    email: "pavel@mail.ru",
    login: "pavel",
    isAuth: false
}


export const setAuthUserData = (data: AutInitialStateType) => {
    return {
        type: 'SET_USER_DATA',
        data
    } as const
}
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(response.data.data));
            }
        })
}


const autReducer = (state: AutInitialStateType = initialState, action: ActionsType): AutInitialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }


        default:
            return state;
    }
}


export default autReducer;