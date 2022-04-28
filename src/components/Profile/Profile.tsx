import React from "react";
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType, ProfilePageType, StoreType} from "../../redux/state";
import {StoreAppType} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";


type ProfilePagePropsType = {
    store: StoreAppType
    /*state: StoreType*/
    // profilePage: ProfilePageType
    /*updateNewPostText: (newText: string) => void
    addPost: () => void*/
    // dispatch: (action: ActionsType) => void
}


export const Profile = (props: ProfilePagePropsType) => {

const posts =  props.store.getState().profile.posts
const newPostText = props.store.getState().profile.newPostText
    const dispatch = props.store.dispatch
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPostsContainer store={props.store} />
        </div>
    )
}