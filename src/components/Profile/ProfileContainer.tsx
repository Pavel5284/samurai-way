import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {getStatus, getUserProfile} from "../../redux/profileReducer";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {Navigate, useParams} from "react-router-dom";


const ProfileContainer = () => {

    let {userId} = useParams()
    const dispatch = useAppDispatch()

        const authorizedUserId = useAppSelector<number>(state => state.auth.userId!)
    if(!userId)
    {userId = authorizedUserId+''}
        const isOwner = +userId! === authorizedUserId
    const isAuth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (userId === null || authorizedUserId === null) return
        dispatch(getUserProfile(+userId! ? +userId! : authorizedUserId))
        dispatch(getStatus(+userId! ? +userId! : authorizedUserId))
    }, [userId])

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Profile
            isOwner={isOwner}
        />
    )
}

export default ProfileContainer