import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type propsDialogType={
    id: number
    name: string
}

type propsMessageType={
    id?: number
    message: string
}

const DialogItem = (props:propsDialogType) => {
    let path = "/dialogs/" + props.id;

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

const Message=(props: propsMessageType) => {
    return <div className={s.message}>{props.message}</div>
}

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                <DialogItem name="Dimych" id={1}/>
                <DialogItem name="Andrey" id={2}/>
                <DialogItem name="Sveta" id={3}/>
                <DialogItem name="Sasha" id={4}/>
                <DialogItem name="Viktor" id={5}/>

            </div>
            <div className={s.messages}>
                <Message  message="Hi" />
                <Message  message="Ha-ha" />
                <Message  message="Hello" />
                <Message  message="How is your samurai-way?" />
            </div>
        </div>
    )
}