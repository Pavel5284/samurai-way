import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";
import {useAppSelector} from "../../redux/redux-store";


export const Dialogs = () => {

    const dialogs = useAppSelector(state => state.dialogs)

    let dialogsElements = dialogs.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} avatar={d.avatar}/>);

    let messagesElements = dialogs.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>);


    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageForm/>
            </div>

        </div>
    )
}

