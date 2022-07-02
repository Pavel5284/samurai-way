import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";



export const Dialogs:React.FC<DialogsPropsType> = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.dialogs
        .map(d => <DialogItem id={d.id} key={d.id} name={d.name}/>);

    let messagesElements = props.dialogs.messages
        .map(m => <Message message={m.message} key={m.id}/>);


    const addNewMessage = (values:FormDataType) => {
       props.sendMessage(values.newMessageBody)
    }
   // if (!props.isAuth) return <Redirect to={"/login"}/>;

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

type FormDataType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newMessageBody" placeholder="Enter your message"/>
        </div>
            <button>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: "dialogAddMessageForm"}) (AddMessageForm);