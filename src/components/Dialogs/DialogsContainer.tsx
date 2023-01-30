import React from "react";
import {PropsDialogType, PropsMessageType, SendMessageActionCreator} from "../../redux/dialogsReducer";
import {AppStateRootType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAutRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";


type MapStateToPropsType = {
    dialogs: PropsDialogType[]
    messages: PropsMessageType[]
    isAuth: boolean
}

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}


let mapStateToProps = (state: AppStateRootType): MapStateToPropsType => {
    return {
        dialogs: state.dialogs.dialogs,
        messages: state.dialogs.messages,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(SendMessageActionCreator(newMessageBody))
        }
    }
}

export default compose<React.ComponentType<{}>>(
    withAutRedirect,
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateRootType>(mapStateToProps, mapDispatchToProps)
)(Dialogs)