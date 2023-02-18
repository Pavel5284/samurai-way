import React from 'react'


import back from '../../assets/images/404.png'

import style from './PageNotFound404.module.css'

export const PageNotFound = () => {
    return (
        <div className={style.block}>
            <div className={style.content}>
                <h1 className={style.title}>Ooops!</h1>
                <p className={style.description}>Sorry! Page not found!</p>
            </div>
                <img className={style.image} src={back} alt="background" />

        </div>
    )
}
