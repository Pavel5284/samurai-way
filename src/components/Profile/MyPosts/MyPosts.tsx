import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";


export const MyPosts = () => {
    return (
        <div className={s.content}>
            <div>
                My post
                <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
                <div className={s.posts}>
                    <Post message="Hi, it's me"/>
                    <Post message='This is first post'/>
                    <Post message='This is second post'/>
                </div>
            </div>

        </div>
    )
}