import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    ActionsType, MessagesPageType,
    PropsDialogType,
    PropsMessageType,

} from "../../redux/state";
import {ChangeNewMessageActionCreator, SendMessageActionCreator} from "../../redux/dialogsReducer";
import {store, StoreAppType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";


/*
type PropsType = {
    dialogs: Array<PropsDialogType>
    messages: Array<PropsMessageType>
}*/


export type DialogsPropsType = {
    store: StoreAppType
}

export const DialogsContainer = (props: DialogsPropsType) => {
    const message = props.store.getState().dialogs.messages
    const dialogs = props.store.getState().dialogs.dialogs
    const dispatch = props.store.dispatch

    const sendMessage = () => {

            dispatch(SendMessageActionCreator());

    }
    let changeNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {

        dispatch(ChangeNewMessageActionCreator(e.currentTarget.value));
    }

    let newMessageBody = props.store.getState().dialogs.newMessageBody

    return (
        <div>
            <Dialogs newMessageBody={newMessageBody}
                     message={message}
                     dialogs={dialogs}
                     changeNewMessage={changeNewMessage}
                     sendMessage={sendMessage}/>
        </div>
    )
}
