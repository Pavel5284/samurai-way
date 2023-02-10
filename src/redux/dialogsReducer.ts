import {ActionsProfileType} from "./profileReducer";

export type MessagesPageType = {
    messages: PropsMessageType[]
    dialogs: PropsDialogType[]
    newMessageBody: string
}

export type PropsDialogType = {
    id: number
    name: string
    avatar?: string
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

}

export type InitialStateType = typeof initialState

const SEND_MESSAGE = 'dialogs/SEND_MESSAGE'

const dialogReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType=> {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage: PropsMessageType = {
                id: new Date().getTime(),
                message: action.newMessageBody
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return  state;
    }
}


export type ActionsDialogsType = ReturnType<typeof SendMessageAC>

export const SendMessageAC = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    } as const
}



export default dialogReducer;