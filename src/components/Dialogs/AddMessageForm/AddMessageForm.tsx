import React from "react";
import {Textarea} from "../../common/FormsControls/FormsControls";
import Button from "antd/es/button";
import {useAppDispatch} from "../../../redux/redux-store";
import {Field, useFormik} from "formik";
import {SendMessageAC} from "../../../redux/dialogsReducer";

type FormikType = {
    Text?: string
}

export const AddMessageForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            Text: '',
        },
        onSubmit: values => {
            dispatch(SendMessageAC(values.Text))
            formik.resetForm()
        },
        validate: (values:FormikType) => {
            const errors: FormikType = {}

            if (!values.Text) {
                errors.Text = 'Required'
            }
            return errors
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                       name="Text"
                       placeholder="Enter your message"
                       onChange={formik.handleChange}
                       value={formik.values.Text}
                />
                {formik.touched.Text && formik.errors.Text &&
                <div style={{color:'red'}}>{formik.errors.Text}</div>
                }
            </div>
            <div>
                <Button type={'default'} htmlType={'submit'}>
                    Send
                </Button>
            </div>
        </form>
    )
}
