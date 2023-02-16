import { Dispatch } from "redux";
import {FormAction} from "redux-form";
import { v1 } from "uuid";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case "chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

const actions = {
    messagesReceivedAC: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChangedAC: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceivedAC(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChangedAC(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
