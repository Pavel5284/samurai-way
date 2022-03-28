import React from "react";
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostDataType} from "../../redux/state";


type ProfilePagePropsType = {
    posts: PostDataType[]
    addPost: (postMessage: string) => void
}


export const Profile = (props: ProfilePagePropsType) => {



    return (
        <div className={s.content}>
            <ProfileInfo />

            <MyPosts posts={props.posts} addPost={props.addPost}/>
        </div>
    )
}