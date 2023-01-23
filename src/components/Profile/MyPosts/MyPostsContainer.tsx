import React  from "react";
import {addPostAC,  PostDataType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppStateRootType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type MapStatePropsType = {
    posts: PostDataType[]

}
type mapDispatchToPropsType = {
    addPost: (text: string) => void
}

export type MyPostsPropsType = MapStatePropsType & mapDispatchToPropsType


const mapStateToProps = (state: AppStateRootType): MapStatePropsType=> {
    return {
        posts: state.profile.posts
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : mapDispatchToPropsType=> {
    return {
        addPost: (text: string) => {
            dispatch(addPostAC(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)