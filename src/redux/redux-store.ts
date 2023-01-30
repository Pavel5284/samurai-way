import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {ActionsProfileType} from "./profileReducer";
import dialogReducer, {ActionsDialogsType} from "./dialogsReducer";
import usersReducer, {ActionsUserType} from "./usersReducer";
import autReducer, {ActionsAuthType, SetUserDataActionType} from "./authReducer";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer, {ActionsAppType, InitializedSuccessActionType} from "./appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type ActionsTypes =
    ActionsProfileType
    | ActionsDialogsType
    | ActionsUserType
    | ActionsAuthType
    | ActionsAppType

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
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware))
);

export type AppStateRootType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppStateRootType, unknown, ActionsTypes>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateRootType> = useSelector

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type StoreAppType = typeof store
//@ts-ignore
window.__store__ = store

export type AllActionsType = SetUserDataActionType | InitializedSuccessActionType

export default store



