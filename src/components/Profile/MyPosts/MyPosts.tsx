import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";



export const MyPosts = React.memo(
    (props: MyPostsPropsType) => {
        let postsElements =
            props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

        let newPostElement = React.createRef<HTMLTextAreaElement>();

        const onAddPost = (values:FormDataType) => {
            props.addPost(values.newPostText);
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
type FormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>>  = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name="newPostText" placeholder={"Post message"}
                validate={[required, maxLength10]}
            />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}
const AddNewPostFormRedux = reduxForm<FormDataType>({form: "ProfileAddNewPostForm"}) (AddNewPostForm)