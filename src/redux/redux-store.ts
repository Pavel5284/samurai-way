import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import autReducer from "./authReducer";


export const rootReducer = combineReducers({
    auth: autReducer,
    profile: profileReducer,
    dialogs: dialogReducer,
    users: usersReducer
})

export type AppStateRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
export type StoreAppType = typeof store

