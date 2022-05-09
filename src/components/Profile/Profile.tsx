import React from "react";
import s from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {StoreAppType} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {PostDataType} from "../../redux/profileReducer";



export const Profile = () => {

/*const posts =  props.store.getState().profile.posts
const newPostText = props.store.getState().profile.newPostText
    const dispatch = props.store.dispatch*/
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPostsContainer />
        </div>
    )
}