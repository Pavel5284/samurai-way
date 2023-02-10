import {useAppSelector} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";
import React from "react";
import {LoginPageForm} from "./LoginPageForm";

export const LoginPage = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const authorizedUserId = useAppSelector(state => state.auth.userId)
    if (isAuth) {
        return <Navigate to={`/profile/${authorizedUserId}`}/>
    }

    return (
        <div>
            <LoginPageForm/>
        </div>
    )

}