import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";


export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer
})

export type AppStateRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
export type StoreAppType = typeof store

