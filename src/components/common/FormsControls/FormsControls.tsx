import React from "react";
import s from "./FormsControls.module.css"

const FormControl = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.form_control + " " + (hasError ? s.error : "")}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


export const Textarea = (props: any) => {
    const {input, meta, child,  ...restProps}: any = props;
    return (
    <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
    )

}

export const Input = (props: any) => {
    const {input, meta, child,  ...restProps}: any = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}