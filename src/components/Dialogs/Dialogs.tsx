import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {MessagesPageType} from "../../redux/state";


/*
type PropsType = {
    dialogs: Array<PropsDialogType>
    messages: Array<PropsMessageType>
}*/

export const Dialogs = (props: MessagesPageType) => {


    let dialogsElements = props.dialogs
        .map(d => <DialogItem id={d.id} name={d.name}/>);
    
    let messagesElements = props.messages
        .map (m => <Message message={m.message}/>);
    let newMessageElement = React.createRef<HTMLTextAreaElement>();

    const sendMessage = () => {
        let text = newMessageElement.current?.value;
        alert(text)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea ref={newMessageElement}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
}