import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import {AppStateRootType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/state";
import {RouteComponentProps, withRouter } from "react-router-dom";


type OwnPropsType = MapStatePropsType & DispatchPropsType

class ProfileContainer extends React.Component <PropsType> {

    componentDidMount() {
        debugger;
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = "2";
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
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
}
export type DispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}


let mapStateToProps = (state: AppStateRootType) : MapStatePropsType => ({
    profile: state.profile.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect <MapStatePropsType,
    DispatchPropsType,
    {},
    AppStateRootType>(mapStateToProps, {setUserProfile})
    (WithUrlDataContainerComponent)