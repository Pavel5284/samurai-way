import React from "react";
import s from "./Post.module.css";
import {PostDataType} from "../../../../redux/profileReducer";


/*type PostPropsType = {
    message: string
    likesCount: number
}*/

export const Post = (props: PostDataType) => {
    return (

        <div className={s.item}>
            <img className={s.item__image}
                src="https://sun9-40.userapi.com/impg/xpQLmHEXpp2_NoBuiQ5eQ7zXd_Ka7MZxToTO5g/7rzipkNl1Ng.jpg?size=460x604&quality=96&sign=d7a38b815e4dcb25457baba995df2c05&type=album"
                alt="ava"/>
            {props.message}

            <div>
                <span>like </span>
                {props.likesCount}
            </div>
        </div>
    )
}