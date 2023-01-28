import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControls/FormsControls.module.css"
import {AppStateRootType, useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {useFormik} from "formik";
import Input from "antd/es/input";
import {Space} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captchaUrl?: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captchaUrl: null
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 7) {
                errors.password = 'Must be more then 7 symbols'
            }
            return errors
        },
        onSubmit: ({email, password, rememberMe, captchaUrl}) => {
            // @ts-ignore
            dispatch(login(email, password, rememberMe, captchaUrl))
        }
    })

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <div>

            </div>

            <form onSubmit={formik.handleSubmit}>
                <Space direction="vertical">
                    <Input placeholder="Login"
                           {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}

                    <Input.Password
                        placeholder="Password"
                        {...formik.getFieldProps('password')}
                        iconRender={visible => (visible ?  <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                </Space>
                {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
                <div>
                    <Checkbox
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                    /> Remember me
                </div>

                {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
                {captchaUrl && <input
                        {...formik.getFieldProps('captchaUrl')}
                    />}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
{/*

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: any) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);*/}
