import React  from "react";
import {addPostAC,  PostDataType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppStateRootType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type MapStatePropsType = {
    posts: PostDataType[]
    messageForNewPost: string
}
type mapDispatchToPropsType = {
    addPost: (text: string) => void
}


const mapStateToProps = (state: AppStateRootType): MapStatePropsType=> {
    return {
        posts: state.profile.posts,
        messageForNewPost: state.profile.messageForNewPost
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : mapDispatchToPropsType=> {
    return {
        addPost: (text: string) => {
            dispatch(addPostAC(text))
        }
    }
}

export const MyPostsContainer = connect<MapStatePropsType, mapDispatchToPropsType, {}, AppStateRootType>(mapStateToProps, mapDispatchToProps) (MyPosts)