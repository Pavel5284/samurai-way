import React from 'react';
import s from "./Paginator.module.css";
import { Pagination } from 'antd';

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    portionSize?: number
    currentPage: number
    currentPageSize: number
    onPageChanged: (pageNumber: number, pageSize: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            totalUsersCount, pageSize,
                                                            currentPageSize,
                                                            currentPage,
                                                            onPageChanged,
                                                            portionSize
                                                        }) => {
    const changePageHandler = (pageNumber: number, pageSize: number) => {
       // if ((pageSize === currentPageSize) && (pageNumber === currentPage)) return;
        onPageChanged(pageNumber, pageSize)
    }


    return (
        <div className={s.paginator}>


            <Pagination current={currentPage}
                        defaultPageSize={currentPageSize}
                        defaultCurrent={1}
                        total={totalUsersCount}
                        pageSizeOptions={['5', '10', '20']}
                        onChange={changePageHandler}/>

        </div>
    );
}