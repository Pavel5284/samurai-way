import React from 'react';
import {connect} from "react-redux";
import {
    FilterType,
    follow,
    followSuccess, requestUsers,
    setCurrentPage, setUsersFilter,
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
    getUsers, getUsersFilter
} from "../../redux/usersSelectors"


type MapStateToPropsType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    filter: FilterType
    isFetching: boolean
    followingInProgress: Array<number>
    portionSize: number
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (pageNumber:number, pageSize: number, filter: FilterType) => void

}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.requestUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize, requestUsers} = this.props
        requestUsers(1, pageSize, filter)
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
                       onFilterChanged={this.onFilterChanged}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
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
        filter: getUsersFilter(state),
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
        requestUsers: requestUsers
    })
) (UsersContainer)