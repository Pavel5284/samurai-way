import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";

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
export const AddNewPostFormRedux = reduxForm<FormDataType>({form: "ProfileAddNewPostForm"}) (AddNewPostForm)