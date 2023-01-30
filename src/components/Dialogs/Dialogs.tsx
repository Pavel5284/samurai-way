import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import { Redirect } from "react-router-dom";
import {PropsDialogType, PropsMessageType} from "../../redux/dialogsReducer";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

type DialogsPropsType = {
    dialogs: PropsDialogType[]
    messages: PropsMessageType[]
    newMessageBody: string
    sendMessage: (values: string) => void
    isAuth: boolean
}

export const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} avatar={d.avatar}/>);

    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>);


    const addNewMessage = (values:{newMessageBody: string}) => {
       props.sendMessage(values.newMessageBody)
        values.newMessageBody = ''
    }
    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

