import React, {ChangeEvent} from "react";
import {ChangeNewMessageActionCreator, MessagesPageType, SendMessageActionCreator} from "../../redux/dialogsReducer";
import {AppStateRootType, StoreAppType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";



type mapStateToProps = {
 dialogs: MessagesPageType
}

type mapDispatchToProps = {
    changeNewMessage: (body: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = mapStateToProps & mapDispatchToProps


let mapStateToProps = (state: AppStateRootType): mapStateToProps => {
    return {
        dialogs: state.dialogs
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeNewMessage: (body: string) => {
            dispatch(ChangeNewMessageActionCreator(body))
        },
    sendMessage: () => {
        dispatch(SendMessageActionCreator())
    }
    }
}

export const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogs)
