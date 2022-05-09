import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";


export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer,
    users: usersReducer
})

export type AppStateRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
export type StoreAppType = typeof store

