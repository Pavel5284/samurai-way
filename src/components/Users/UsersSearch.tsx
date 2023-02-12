import {Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {FilterType, requestUsers} from "../../redux/usersReducer";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {getPageSize, getUsersFilter} from "../../redux/usersSelectors";
import {Button, Input, Select} from "antd";
import s from './Users.module.css'


export type FriendFormType = 'all' | 'friends'

type PropsType = {
    termQuery: string,
    friendQuery: FriendFormType
    setSearchParams: ({}: { name: string, friend: FriendFormType } | {}) => void
}
export const UsersSearch: React.FC<PropsType> = React.memo((props) => {
    const dispatch = useAppDispatch()
    const currentPageSize = useAppSelector(getPageSize)
    const [term, setTerm] = useState(props.termQuery)
    const [onlyFriend, setOnlyFriend] = useState<FriendFormType>(props.friendQuery)

    const selectHandler = (value: FriendFormType) => {
        setOnlyFriend(value)
    }
    const inputHandler = (e: any) => {
        setTerm(e.target.value)
    }
    const buttonHandler = () => {
        props.setSearchParams({term: term, friend: onlyFriend})
         dispatch(requestUsers(1, currentPageSize, {term, friend: onlyFriend === 'friends'}))
    }

 /*   const pressEnter = (e: any) => {
        e.key === "Enter" && buttonHandler(e.target.value)
    }*/

    return <div className={s.search__container}>

        <Input
            /*onKeyUp={pressEnter}*/
            autoFocus
            defaultValue={term || ''}
            value={term || ''}
            placeholder="Basic usage"
            onChange={inputHandler}
            name="term"
        />
        <Select
            defaultValue={onlyFriend}
            value={onlyFriend}
            style={{width: 120}}
            onChange={selectHandler}
            options={[
                {value: 'all', label: 'All'},
                {value: 'friends', label: 'Friends'},
            ]}/>
        <Button type="primary" onClick={buttonHandler}>
            Find
        </Button>
    </div>
})