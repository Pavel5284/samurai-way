import {AppStateRootType} from "./redux-store";

export const getUsers = (state:AppStateRootType) => {
    return state.users.users;
}
export const getPageSize = (state:AppStateRootType) => {
    return state.users.pageSize;
}
export const getTotalUsersCount = (state:AppStateRootType) => {
    return state.users.totalUsersCount;
}
export const getCurrentPage = (state:AppStateRootType) => {
    return state.users.currentPage;
}
export const getIsFetching = (state:AppStateRootType) => {
    return state.users.isFetching;
}
export const getFollowingInProgress = (state:AppStateRootType) => {
    return state.users.followingInProgress;
}