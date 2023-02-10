import Input from 'antd/es/input';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {updateStatus} from "../../../redux/profileReducer";

type PropsType = {
    status?: string
    updateStatus?: () => void
}

export const ProfileStatus:React.FC<PropsType> = (props) => {

    const dispatch = useAppDispatch()
    const statusFromState = useAppSelector<string>( state => state.profile.status)

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(statusFromState);

    useEffect(() => {
        setStatus(statusFromState);
    },[statusFromState])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{statusFromState || '-----'}</span>
            </div>
            }

            {editMode &&
            <div>
                <Input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                value={status}/>
            </div>
            }
        </div>
    );
};
