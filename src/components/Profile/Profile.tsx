import React from "react";
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostsType} from "../../redux/state";





export const Profile = (props: PostsType) => {



    return (
        <div className={s.content}>
            <ProfileInfo />

            <MyPosts posts={props.posts}/>
        </div>
    )
}