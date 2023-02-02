import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    followSuccess, requestUsers,
    setCurrentPage,
    toggleIsFollowingProgress, unfollow, unfollowSuccess,
    UsersDataType
} from "../../redux/usersReducer";
import {AppStateRootType} from "../../redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {withAutRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors"


type MapStateToPropsType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    portionSize: number
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    //toggleIsFollowingProgress: (followingInProgress: boolean, userId: number) => void
    requestUsers: (pageNumber:number, pageSize: number) => void

}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }


    render() {


        return <>
            {this.props.isFetching ?
                <Preloader/>
                : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       //toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                       portionSize={this.props.portionSize}
                />
        </>
    }

}

const mapStateToProps = (state: AppStateRootType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)

    }
}


export default compose<React.ComponentType<{}>> (
    withAutRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateRootType>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        requestUsers
    })
) (UsersContainer)