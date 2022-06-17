import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, setUserProfile} from "../../redux/profileReducer";
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
            userId = "2";
        }
        this.props.getUserProfile(Number(userId))
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
    getUserProfile: (userId: number) => void
}


let mapStateToProps = (state: AppStateRootType) : MapStatePropsType => ({
    profile: state.profile.profile,
});


// const conectProf = connect <MapStatePropsType,
//     DispatchPropsType,
//     {},
//     AppStateRootType>(mapStateToProps, {getUserProfile, setUserProfile})
// (ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(conectProf);
//
// const redirectProf = withAutRedirect(WithUrlDataContainerComponent)


export default compose<React.ComponentType>(
    withAutRedirect,
    withRouter,
    connect<MapStatePropsType,DispatchPropsType,{},AppStateRootType>(mapStateToProps, {getUserProfile, setUserProfile}))
(ProfileContainer)

// export default redirectProf