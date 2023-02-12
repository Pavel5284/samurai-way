import React from "react";
import {useAppSelector} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {Navigate} from "react-router-dom";

const DialogsContainer = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
        return (
            <>
                <Dialogs />
            </>
        )
}

export default DialogsContainer