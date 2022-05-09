import React from "react";
import s from './../Dialogs.module.css';
import {PropsMessageType} from "../../../redux/dialogsReducer";


export const Message=(props: PropsMessageType) => {
    return <div className={s.message}>{props.message}</div>
}
