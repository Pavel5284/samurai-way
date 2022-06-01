import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, setUserProfile} from "../../redux/profileReducer";
import {AppStateRootType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/state";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";


type OwnPropsType = MapStatePropsType & DispatchPropsType

class ProfileContainer extends React.Component <PropsType> {

    componentDidMount() {
        debugger;
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = "2";
        }
        this.props.getUserProfile(Number(userId))
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"}/>;
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
export type MapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}
export type DispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
    getUserProfile: (userId: number) => void
}


let mapStateToProps = (state: AppStateRootType) : MapStatePropsType => ({
    profile: state.profile.profile,
    isAuth: state.auth.isAuth
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect <MapStatePropsType,
    DispatchPropsType,
    {},
    AppStateRootType>(mapStateToProps, {getUserProfile, setUserProfile})
    (WithUrlDataContainerComponent)