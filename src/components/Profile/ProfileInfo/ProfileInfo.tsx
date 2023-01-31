import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ContactType, ProfileType} from "../../../redux/state";
import userIcon from "../../../assets/images/user.png";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {InjectedFormProps} from "redux-form";
import Button from "antd/es/button";
import Input from "antd/es/input";
import { RetweetOutlined, UploadOutlined } from "@ant-design/icons/lib/icons";
import Upload from "antd/es/upload";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: string) => void
    saveProfile: (profile: ProfileType) => void
}


export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: { target: any }) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.description__block}>
                <div>
                    <img className={s.mainPhoto}
                         src={props.profile.photos.large || userIcon}
                         alt="user Avatar"/>
                    {props.isOwner &&
                        <Input type="file" onChange={onMainPhotoSelected}/>
                      /*  <Upload>
                        <Button onChange={onMainPhotoSelected} icon={<UploadOutlined />}>Change Ava</Button>
                        </Upload>*/
                     }
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
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}
type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}
const ProfileData = (props: ProfileDataPropsType) => {
    return <div>
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