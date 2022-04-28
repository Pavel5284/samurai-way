import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    ActionsType,  MessagesPageType,
    PropsDialogType,
    PropsMessageType,

} from "../../redux/state";
import {ChangeNewMessageActionCreator, SendMessageActionCreator} from "../../redux/dialogsReducer";
import {store, StoreAppType} from "../../redux/redux-store";


/*
type PropsType = {
    dialogs: Array<PropsDialogType>
    messages: Array<PropsMessageType>
}*/


export type DialogsPropsType = {
    dialogs: PropsDialogType[]
    message: PropsMessageType[]
    changeNewMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void
    newMessageBody: string
    sendMessage: () => void
}



export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs
        .map(d => <DialogItem id={d.id} name={d.name}/>);

    let messagesElements = props.message
        .map(m => <Message message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                    onChange={props.changeNewMessage}
                    value={props.newMessageBody}
                />
                <button onClick={props.sendMessage}>Send</button>
            </div>

        </div>
    )
}
