import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/state";







export const MyPosts = (props: PostsType) => {


debugger;
    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

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
                    {postsElements}
                </div>
            </div>

        </div>
    )
}