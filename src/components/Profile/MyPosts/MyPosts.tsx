import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";


export const MyPosts = () => {
    return (
        <div className={s.posts__block}>
            <div>
                <h3>My post</h3>
                <div>
                    <div>
                <textarea></textarea>
                </div>
                    <div>
                <button>Add post</button>
                </div>
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