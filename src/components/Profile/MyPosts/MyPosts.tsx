import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {ActionsType,  PostDataType} from "../../../redux/state";
import {addPostActionCreator, ChangeNewTextActionCreator} from "../../../redux/profileReducer";


type MyPostsPropsType = {
    posts: PostDataType[]
   /* addPost: () => void*/
    newPostText: string
    /*updateNewPostText: (newText: string) => void*/
    dispatch: (action: ActionsType) => void
}



export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements =
        props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
            props.dispatch(addPostActionCreator(props.newPostText));
        }

    let onPostChange = () => {
        if (newPostElement.current) {
        props.dispatch( ChangeNewTextActionCreator(newPostElement.current.value));
    }}

    return (
        <div className={s.posts__block}>
            <div>
                <h3>My post</h3>
                <div>
                    <div>
                        <textarea ref={newPostElement} onChange={onPostChange}
                                    value={props.newPostText}></textarea>
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