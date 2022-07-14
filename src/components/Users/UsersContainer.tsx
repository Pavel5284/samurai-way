import React from 'react';
import {connect} from "react-redux";
import {
    followSuccess, getUsers,
    setCurrentPage,
    setTotalUsersCount, setUsers,
    toggleIsFetching, toggleIsFollowingProgress, unfollowSuccess,
    UsersDataType
} from "../../redux/usersReducer";
import {AppStateRootType} from "../../redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";
import {withAutRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


type MapStateToPropsType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type MapDispatchToPropsType = {
    followSuccess: (userId: number) => void
    unfollowSuccess: (userId: number) => void
    //setUsers: (users: UsersDataType[]) => void
    setCurrentPage: (pageNumber: number) => void
  //setTotalUsersCount: (totalUsersCount: number) => void
  // toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (followingInProgress: boolean, userId: number) => void
    //getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    getUsers: (pageNumber:number, pageSize: number) => void

}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
       /* this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });*/

    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
/*
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
        });*/
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
                       follow={this.props.followSuccess}
                       unfollow={this.props.unfollowSuccess}
                       //toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                />
        </>
    }

}

const mapStateToProps = (state: AppStateRootType): MapStateToPropsType => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress

    }
}

/*

export default connect(mapStateToProps, {
    followSuccess,
    unfollowSuccess,
    setCurrentPage,
    toggleIsFollowingProgress,
    getUsers: getUsers
})(UsersContainer);*/


export default compose<React.ComponentType<{}>> (
    withAutRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateRootType>(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers: getUsers
    })
) (UsersContainer)