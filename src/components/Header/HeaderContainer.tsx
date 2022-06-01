import React from 'react';
import {Header} from "./Header";
import {AutInitialStateType, getAuthUserData, setAuthUserData} from "../../redux/authReducer";
import {connect} from "react-redux";
import {AppStateRootType} from "../../redux/redux-store";

type OwnPropsType = MapStatePropsType & MapDispatchType



//type PropsType = RouteComponentProps<OwnPropsType>

class HeaderContainer extends React.Component<OwnPropsType>{
    componentDidMount() {
       this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props}/>
    }

}

export type MapStatePropsType = {
    isAuth: boolean
    login: string
    email: string
}

export type MapDispatchType = {
    setAuthUserData: (data: AutInitialStateType) => void
    getAuthUserData: () => void
}

const mapStateToProps = (state: AppStateRootType): MapStatePropsType => ({
    isAuth: state.auth. isAuth,
    login: state.auth.login,
    email: state.auth.email
})



export default connect<MapStatePropsType, MapDispatchType, {}, AppStateRootType>(mapStateToProps, {setAuthUserData, getAuthUserData}) (HeaderContainer) ;

