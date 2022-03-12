import React from "react";
import s from "./ProfileInfo.module.css";



export const ProfileInfo = () => {
    return (
        <div>
            <div className={s.main__image}>
                <img
                    src="https://www.culture.ru/storage/images/34a20c3ceeb456e7225316a0c05902e9/1a088b633c9a35946b82f904b8f7dfc5.jpeg"
                    alt="image"/>
            </div>
            <div className={s.description__block}>
                ava + description
            </div>
        </div>
    )
}