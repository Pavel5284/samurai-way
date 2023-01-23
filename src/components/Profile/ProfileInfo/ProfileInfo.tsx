import React from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileType, UserPhotosType} from "../../../redux/state";
import userIcon from "../../../assets/images/user.png";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: string) => void

}


export const ProfileInfo = (props: ProfileInfoPropsType) => {

     if(!props.profile) {
       return <Preloader/>
     }

     const onMainPhotoSelected = (e: {target: any}) => {
             if (e.target.files.length) {
                 props.savePhoto(e.target.files[0])
             }
     }

    return (
        <div>
            <div className={s.description__block}>
                <div>
                    <img className={s.mainPhoto}
                        src={props.profile.photos.large || userIcon}
                        alt="user Avatar"/>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}