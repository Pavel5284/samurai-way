import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {ActionsProfileType} from "./profileReducer";
import dialogReducer, {ActionsDialogsType} from "./dialogsReducer";
import usersReducer, {ActionsUserType} from "./usersReducer";
import autReducer, {ActionsAuthType, SetUserDataActionType} from "./authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch } from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer, {ActionsAppType, InitializedSuccessActionType} from "./appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {chatReducer} from "./chat-reducer";

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
    app: appReducer,
    chat: chatReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware))
);

export type AppStateRootType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppStateRootType, unknown, ActionsTypes>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateRootType> = useSelector

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateRootType, unknown, A>

export type StoreAppType = typeof store
//@ts-ignore
window.store = store

export type AllActionsType = SetUserDataActionType | InitializedSuccessActionType

export default store



