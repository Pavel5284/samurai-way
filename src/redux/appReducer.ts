import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AllActionsType, AppStateRootType} from "./redux-store";
import {ThunkDispatchType, ThunkType } from "./usersReducer";

export type ActionsAppType = InitializedSuccessActionType | SetAppErrorActionType


export type InitializedSuccessActionType = ReturnType<typeof initializedSuccess>
export type SetAppErrorActionType = ReturnType<typeof setAppError>


export type AppInitialStateType = {
    initialized: boolean
    globalError: string | null
}

const initialState: AppInitialStateType = {
    initialized: false,
    globalError: null
}


export const initializedSuccess = () => {
    return {
        type: 'INITIALIZED_SUCCESS',
    } as const
}
export const setAppError = (error: string | null) => {
    return {
        type: 'SET_ERROR',
        error
    } as const
}

export const initializeApp = (): ThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
        .catch((error) => {
            dispatch(setAppError(error.messages))
        })


}


const appReducer = (state: AppInitialStateType = initialState, action: ActionsAppType): AppInitialStateType => {

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        case "SET_ERROR":
            return {
                ...state,
                globalError: action.error
            }


        default:
            return state;
    }
}


export default appReducer;