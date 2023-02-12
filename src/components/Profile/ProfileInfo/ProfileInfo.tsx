import React, {useRef, useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ContactType, ProfileType} from "../../../redux/state";
import userIcon from "../../../assets/images/user.png";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import Button from "antd/es/button";
import Input from "antd/es/input";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {savePhoto, saveProfile} from "../../../redux/profileReducer";
import {ProfileStatus} from "./ProfileStatus";
import {Avatar} from "antd";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
}


export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const [editMode, setEditMode] = useState(false)
    const userLargeAvatar = useAppSelector(state => state.profile.profile?.photos.large)
    const error = useAppSelector(state => state.profile.formError)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: { target: any }) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }
    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    }

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
        if (error) {
            setEditMode(false)
        }
    }

    return (
        <div className={s.profile__block}>
            <Avatar src={userLargeAvatar || userIcon} alt="user Avatar"
                    size={150}/>
            {props.isOwner && (
                <>
                    <Button  className={s.profile__button} onClick={selectFileHandler}>Change Photo</Button>
                    <input
                        style={{display: 'none'}}
                        type="file"
                        ref={inputRef}
                        onChange={onMainPhotoSelected}/>
                </>
            )
            }
            <ProfileStatus/>
            {editMode ? <ProfileDataFormReduxForm
                initialValues={props.profile}
                onSubmit={onSubmit}
            /> : <ProfileData profile={props.profile}
                              isOwner={props.isOwner}
                              goToEditMode={() => {
                                  setEditMode(true)
                              }}

            />
            }

        </div>
    )
}
type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}
const ProfileData = (props: ProfileDataPropsType) => {
    return <div className={s.description__block}>
        {props.isOwner && <div>
            <Button type={'default'} onClick={props.goToEditMode}>Edit</Button>
        </div>}
        <div>
            <b>Full name</b>: {props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me</b>: {props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key}
                            contactValue={props.profile.contacts[key as keyof ContactType]}/>
        })}
        </div>
    </div>
}


type ContactProps = {
    contactTitle: string
    contactValue?: string
}
export const Contact = ({contactTitle, contactValue}: ContactProps) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue ?? '-'}</div>
}