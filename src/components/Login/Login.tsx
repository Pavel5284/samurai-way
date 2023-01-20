import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import s from "./../common/FormsControls/FormsControls.module.css"


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
            {createField('Email', 'email', [required], Input )}
            {createField('Password', 'password', [required], Input, {type: 'password'} )}
            {createField(null, 'rememberMe', [], Input,
                {type: 'checkbox'}, 'remember me' )}
        {props.error && <div className={s.form_summary_error}>
            {props.error}
        </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
}) (LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
       props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm  onSubmit={onSubmit}/>
</div>
}
const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
})
export default connect (mapStateToProps, {login}) (Login);