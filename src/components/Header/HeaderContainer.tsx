import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import s from './Header.module.css';
import {Header} from "./Header";
import axios from "axios";
import {AutInitialStateType, setAuthUserData} from "../../redux/authReducer";
import {connect} from "react-redux";
import {AppStateRootType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/state";

type OwnPropsType = MapStatePropsType & MapDispatchType



//type PropsType = RouteComponentProps<OwnPropsType>

class HeaderContainer extends React.Component<OwnPropsType>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data.data);
                }
            })
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
}

const mapStateToProps = (state: AppStateRootType): MapStatePropsType => ({
    isAuth: state.auth. isAuth,
    login: state.auth.login,
    email: state.auth.email
})



export default connect<MapStatePropsType, MapDispatchType, {}, AppStateRootType>(mapStateToProps, {setAuthUserData}) (HeaderContainer) ;

