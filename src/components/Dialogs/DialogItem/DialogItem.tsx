import React from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {PropsDialogType} from "../../../redux/dialogsReducer";





export const DialogItem = (props: PropsDialogType) => {
    let path = "/dialogs/" + props.id;

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

