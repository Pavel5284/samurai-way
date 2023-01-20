import React from "react";
import s from "./FormsControls.module.css"
import {Field, WrappedFieldProps} from "redux-form";

const FormControl = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.form_control + " " + (hasError ? s.error : "")}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, child, ...restProps}: any = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )

}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, child, ...restProps}: any = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}

export const createField = (placeholder: string | null, name: string,
                            validators: ((value: string) => string | undefined)[],
                            component: React.FC<WrappedFieldProps>, props = {}, text = '') => {
    return (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
    )

}