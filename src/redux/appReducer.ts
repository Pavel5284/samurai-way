import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AllActionsType, AppStateRootType} from "./redux-store";

export type ActionsAppType = InitializedSuccessActionType


export type InitializedSuccessActionType = ReturnType<typeof initializedSuccess>


export type AppInitialStateType = {
    initialized: boolean
}

const initialState: AppInitialStateType = {
    initialized: false
}


export const initializedSuccess = () => {
    return {
        type: 'INITIALIZED_SUCCESS',
    } as const
}
export const initializeApp = (): ThunkAction<void, AppStateRootType, never, AllActionsType> => (dispatch) => {
    let promise = dispatch(getAuthUserData())
        Promise.all([promise])
            .then(() => {
            dispatch(initializedSuccess())
        })



}




const appReducer = (state: AppInitialStateType = initialState, action: ActionsAppType): AppInitialStateType => {

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }


        default:
            return state;
    }
}


export default appReducer;