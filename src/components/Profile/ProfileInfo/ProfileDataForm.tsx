import {ProfileType} from "../../../redux/state";
import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from '../../common/FormsControls/FormsControls.module.css';
import Button from "antd/es/button";

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType>> = (props) => {
    const {handleSubmit, initialValues, error} = props
    return <form onSubmit={handleSubmit}>
        <div>
            <Button type={'default'} onClick={handleSubmit}>Save</Button>
            {error && <div className={style.form_summary_error}>
                {error}
            </div>}

        </div>
        <div>
            <b>Full name</b>:
            {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>:
            {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>

        <div>
            <b>About me</b>:
            {createField('About me', 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(initialValues.contacts ?? {}).map((key) => {
            return <div key={key} className={s.contact}>
                <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

export const ProfileDataFormReduxForm = reduxForm<ProfileType>({form: 'edit-profile'})(ProfileDataForm)