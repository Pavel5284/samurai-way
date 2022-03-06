import React from "react";
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";


export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://www.culture.ru/storage/images/34a20c3ceeb456e7225316a0c05902e9/1a088b633c9a35946b82f904b8f7dfc5.jpeg"
                    alt="image"/>
                'Main content'
            </div>
            <div>
                ava + description
            </div>
            <MyPosts />
        </div>
    )
}