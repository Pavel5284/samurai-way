import React from "react";
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType, ProfilePageType, StoreType} from "../../redux/state";


type ProfilePagePropsType = {
    /*state: StoreType*/
    profilePage: ProfilePageType
    /*updateNewPostText: (newText: string) => void
    addPost: () => void*/
    dispatch: (action: ActionsType) => void
}


export const Profile = (props: ProfilePagePropsType) => {



    return (
        <div className={s.content}>
            <ProfileInfo />

            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     /*updateNewPostText={props.updateNewPostText}
                     addPost={props.addPost}/>*/
                    dispatch={props.dispatch}/>
        </div>
    )
}