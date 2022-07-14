import React from 'react';
import {Header} from "./Header";
import {AutInitialStateType, getAuthUserData, logout, setAuthUserData} from "../../redux/authReducer";
import {connect} from "react-redux";
import {AppStateRootType} from "../../redux/redux-store";

export type HeaderContainerOwnPropsType = MapStatePropsType & MapDispatchType



//type PropsType = RouteComponentProps<OwnPropsType>

class HeaderContainer extends React.Component<HeaderContainerOwnPropsType>{


    render() {
        return <Header {...this.props}/>
    }

}

export type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    email: string | null
}

export type MapDispatchType = {
    logout: () => void
}

const mapStateToProps = (state: AppStateRootType): MapStatePropsType => ({
    isAuth: state.auth. isAuth,
    login: state.auth.login,
    email: state.auth.email
})



export default connect<MapStatePropsType, MapDispatchType, {}, AppStateRootType>(mapStateToProps, {logout}) (HeaderContainer) ;

