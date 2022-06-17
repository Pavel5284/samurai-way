import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, setUserProfile, updateStatus} from "../../redux/profileReducer";
import {AppStateRootType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/state";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAutRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type OwnPropsType = MapStatePropsType & DispatchPropsType

class ProfileContainer extends React.Component <PropsType> {

    componentDidMount() {
        debugger;
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = "16760";
        }
        this.props.getUserProfile(Number(userId));
        this.props.getStatus(Number(userId))
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
export type MapStatePropsType = {
    profile: ProfileType | null
    status: string

}
export type DispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}


let mapStateToProps = (state: AppStateRootType) : MapStatePropsType => ({
    profile: state.profile.profile,
    status: state.profile.status
});



export default compose<React.ComponentType>(
    withAutRedirect,
    withRouter,
    connect<MapStatePropsType,DispatchPropsType,{},AppStateRootType>(mapStateToProps, {getUserProfile, setUserProfile, getStatus, updateStatus}))
(ProfileContainer)

// export default redirectProf