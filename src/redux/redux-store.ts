import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";


export const rootState = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer
})

export type AppStateRootType = ReturnType<typeof rootState>

export const store = createStore(rootState)
export type StoreAppType = typeof store

