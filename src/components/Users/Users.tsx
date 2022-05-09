import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import s from './Users.module.css'

export const Users = (props: UsersPropsType) => {

    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, photoURL: 'https://oir.mobi/uploads/posts/2019-12/1576864907_1-2.jpg',
                followed: false, fullName: 'Dmitry', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
            {id: 2, photoURL: 'https://oir.mobi/uploads/posts/2019-12/1576864907_1-2.jpg',
                followed: true, fullName: 'Sasha', status: 'Hello', location: {city: 'Moskow', country: 'Russia'}},
            {id: 3, photoURL: 'https://oir.mobi/uploads/posts/2019-12/1576864907_1-2.jpg',
                followed: false, fullName: 'Andrew', status: 'Hello', location: {city: 'Kiev', country: 'Ukraine'}}

        ])
    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoURL} className={s.userPhoto}/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                        : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </div>)
        }
    </div>
}