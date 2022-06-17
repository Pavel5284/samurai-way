import React, {ChangeEvent} from "react";
import {ChangeNewMessageActionCreator, MessagesPageType, SendMessageActionCreator} from "../../redux/dialogsReducer";
import {AppStateRootType, StoreAppType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAutRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";



type MapStateToPropsType = {
 dialogs: MessagesPageType
   // isAuth: boolean
}

type MapDispatchToPropsType = {
    changeNewMessage: (body: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


let mapStateToProps = (state: AppStateRootType): MapStateToPropsType => {
    return {
        dialogs: state.dialogs,
        //isAuth: state.auth.isAuth
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

/*export const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogs)*/
 export default compose<React.ComponentType<{}>>(
     withAutRedirect,
     withRouter,
     connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateRootType> (mapStateToProps, mapDispatchToProps)
 )(Dialogs)