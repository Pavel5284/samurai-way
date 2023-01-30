import Input from 'antd/es/input';
import React, {ChangeEvent, useEffect, useState} from 'react';


type PropsType = {
    status: string;
    updateStatus: (status:string) => void
}

const ProfileStatusWithHooks = (props:PropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
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

export default ProfileStatusWithHooks;