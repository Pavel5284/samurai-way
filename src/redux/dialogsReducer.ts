import {ActionsType, MessagesPageType, PropsMessageType} from "./state";

const dialogReducer = (state: MessagesPageType, action: ActionsType) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageBody = action.newMessageText;
            return  state;
        case 'SEND-MESSAGE':
            let newMessage: PropsMessageType = {
                id: new Date().getTime(),
                message: action.newMessage
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

export const SendMessageActionCreator = (newMessage: string) => {
    return {
        type: 'SEND-MESSAGE',
        newMessage: newMessage
    } as const
}

export const ChangeNewMessageActionCreator = (newMessageText: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newMessageText: newMessageText
    } as const
}

export default dialogReducer;