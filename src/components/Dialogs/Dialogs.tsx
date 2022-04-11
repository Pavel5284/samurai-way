import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    ActionsType,  MessagesPageType,
    PropsDialogType,
    PropsMessageType,

} from "../../redux/state";
import {ChangeNewMessageActionCreator, SendMessageActionCreator} from "../../redux/dialogsReducer";


/*
type PropsType = {
    dialogs: Array<PropsDialogType>
    messages: Array<PropsMessageType>
}*/


export type DialogsPropsType = {
    messagesPage: MessagesPageType
    //messages: PropsMessageType[]
    //dialogs: PropsDialogType[]
    //newMessageBody: string
    dispatch: (action: ActionsType) => void
}

export const Dialogs = (props: DialogsPropsType) => {


    let dialogsElements = props.messagesPage.dialogs
        .map(d => <DialogItem id={d.id} name={d.name}/>);
    
    let messagesElements = props.messagesPage.messages
        .map (m => <Message message={m.message}/>);
    let newMessageElement = React.createRef<HTMLTextAreaElement>();

    const sendMessage = () => {
        /*let text = newMessageElement.current?.value;
        alert(text)*/
        if (newMessageElement.current) {
            props.dispatch(SendMessageActionCreator(newMessageElement.current.value));
        }
    }
    let changeNewMessage = () => {
        if (newMessageElement.current) {
            props.dispatch( ChangeNewMessageActionCreator(newMessageElement.current.value));
        }}

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                    ref={newMessageElement}
                    onChange={changeNewMessage}
                    value={props.messagesPage.newMessageBody}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
}