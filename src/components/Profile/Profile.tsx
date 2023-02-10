import React from "react";
import s from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useAppSelector} from "../../redux/redux-store";

type ProfilePropsType = {
    isOwner: boolean
}

export const Profile = (props: ProfilePropsType) => {
    const profile = useAppSelector(state => state.profile.profile)
    return (
        <div className={s.content}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={profile}
               />
        </div>
    )
}