import React from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";



export const ProfileInfo = (props: any) => {
    if(!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.main__image}>
                <img
                    src="https://www.culture.ru/storage/images/34a20c3ceeb456e7225316a0c05902e9/1a088b633c9a35946b82f904b8f7dfc5.jpeg"
                    alt="image"/>
            </div>
            <div className={s.description__block}>
                <img src={props.profile.photos.large || "https://sun9-40.userapi.com/impg/xpQLmHEXpp2_NoBuiQ5eQ7zXd_Ka7MZxToTO5g/7rzipkNl1Ng.jpg?size=460x604&quality=96&sign=d7a38b815e4dcb25457baba995df2c05&type=album"} alt="profile avatar"/>
                ava + description
            </div>
        </div>
    )
}