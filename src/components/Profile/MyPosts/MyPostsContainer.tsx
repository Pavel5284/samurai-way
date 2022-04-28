import React, {ChangeEvent} from "react";
import {Post} from "./Post/Post";
import {addPostActionCreator, ChangeNewTextActionCreator} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {StoreAppType} from "../../../redux/redux-store";


type MyPostsPropsType = {
    store: StoreAppType
}



export const MyPostsContainer = (props: MyPostsPropsType) => {
    // let postsElements =
    //     props.store.getState().profile.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const state = props.store.getState()
    //let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
            props.store.dispatch(addPostActionCreator(props.store.getState().profile.newPostText));
        }

    let onPostChange = (text: string) => {
        debugger
        props.store.dispatch( ChangeNewTextActionCreator(text));
    }

    return (
       <MyPosts newPostText={state.profile.newPostText} posts={state.profile.posts} addPost={addPost} updateNewPostText={onPostChange} />
    )
}