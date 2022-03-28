import React from "react";
import s from './../Dialogs.module.css';
import {PropsMessageType} from "../../../redux/state";





/*
type PropsType= {
    message: string
}
*/



export const Message=(props: PropsMessageType) => {
    return <div className={s.message}>{props.message}</div>
}
