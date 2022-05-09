import {ActionsType} from "./profileReducer";

export type MessagesPageType = {
    messages: PropsMessageType[]
    dialogs: PropsDialogType[]
    newMessageBody: string
}

export type PropsDialogType = {
    id: number
    name: string
}
export type PropsMessageType={
    id?: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'}
    ] as PropsDialogType[],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Ha-ha'},
        {id: 3, message: 'Hello'},
        {id: 4, message: 'How is your samurai-way?'}
    ] as PropsMessageType[],
    newMessageBody: ''
}

export type InitialStateType = typeof initialState

const dialogReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType=> {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT':
            return  {
                ...state,
                newMessageBody: action.newMessageText
            };
           /* stateCopy.newMessageBody = action.newMessageText;*/
        case 'SEND-MESSAGE':
            let newMessage: PropsMessageType = {
                id: new Date().getTime(),
                message: state.newMessageBody
            };
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, newMessage]
            };
        default:
            return  state;
    }
}

export type ChangeNewMessageActionType = ReturnType<typeof ChangeNewMessageActionCreator>
export type SendMessageActionType = ReturnType<typeof SendMessageActionCreator>

export const SendMessageActionCreator = () => {
    return {
        type: 'SEND-MESSAGE',
    } as const
}

export const ChangeNewMessageActionCreator = (newMessageText: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newMessageText: newMessageText
    } as const
}

export default dialogReducer;