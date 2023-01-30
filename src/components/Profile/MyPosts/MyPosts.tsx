import React from "react";
import s from "./MyPosts.module.css";
import {Post, PostType} from "./Post/Post";
import {AddNewPostFormRedux} from "./AddNewPostForm/AddNewPostForm";

type PropsType = {
    posts: PostType[]
    messageForNewPost: string
    addPost: (postMessage: string) => void
}

export const MyPosts = React.memo(
    (props: PropsType) => {
        let postsElements =
            props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)


        const onAddPost = (values:{newPostText: string}) => {
            props.addPost(values.newPostText)
            values.newPostText = ''
        }



        return (
            <div className={s.posts__block}>
                <div>
                    <h3>My post</h3>
                    <AddNewPostFormRedux onSubmit={onAddPost}/>
                    <div className={s.posts}>
                        {postsElements}
                    </div>
                </div>

            </div>
        )
    }

)
