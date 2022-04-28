import {ActionsType, MessagesPageType, PropsMessageType} from "./state";



const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Ha-ha'},
        {id: 3, message: 'Hello'},
        {id: 4, message: 'How is your samurai-way?'}
    ],
    newMessageBody: ''
}

const dialogReducer = (state: MessagesPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageBody = action.newMessageText;
            return  state;
        case 'SEND-MESSAGE':
            let newMessage: PropsMessageType = {
                id: new Date().getTime(),
                message: state.newMessageBody
            }
            state.newMessageBody = '';
            state.messages.push(newMessage);
            return  state;
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