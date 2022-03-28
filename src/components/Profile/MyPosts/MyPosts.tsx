import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostDataType} from "../../../redux/state";


type MyPostsPropsType = {
    posts: PostDataType[]
    addPost: (postMessage: string) => void
}


export const MyPosts = (props: MyPostsPropsType) => {


    let postsElements =
        props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();


    const addPost = () => {
        debugger
        let text = newPostElement.current?.value;
        if (text) {
            props.addPost(text);

        }

        /*newPostElement.current.value = '';*/
    }

    return (
        <div className={s.posts__block}>
            <div>
                <h3>My post</h3>
                <div>
                    <div>
                        <textarea ref={newPostElement}></textarea>
                    </div>
                    <div>
                        <button onClick={addPost}>Add post</button>
                    </div>
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>

        </div>
    )
}