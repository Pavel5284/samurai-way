import React, {useState} from 'react';
import s from "./Paginator.module.css";
import cn from 'classnames'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

type PaginatorType = {
    totalUsersCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = (props: PaginatorType) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pageCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return <div className={s.paginator}>
        {portionNumber > 1 &&
            <LeftOutlined onClick={()=> {setPortionNumber(portionNumber - 1)}}>PREV</LeftOutlined>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span  className={cn ({
                    [s.selectedPage] : props.currentPage === p
                }, s.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        {portionCount > portionNumber  &&
            <RightOutlined onClick={()=> {setPortionNumber(portionNumber + 1)}}>NEXT</RightOutlined>}
    </div>
}