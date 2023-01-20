import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import autReducer, {SetUserDataActionType} from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer, {InitializedSuccessActionType} from "./appReducer";


export const rootReducer = combineReducers({
    auth: autReducer,
    profile: profileReducer,
    dialogs: dialogReducer,
    users: usersReducer,
    form: formReducer,
    app: appReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)
);

export type AppStateRootType = ReturnType<typeof rootReducer>

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type StoreAppType = typeof store
//@ts-ignore
window.__store__ = store

export type AllActionsType = SetUserDataActionType | InitializedSuccessActionType

export default store



