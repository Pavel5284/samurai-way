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
        if ((pageSize === currentPageSize) && (pageNumber === currentPage)) return;
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

    /*let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.paginator}>
        {portionNumber > 1 &&
            <LeftOutlined onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</LeftOutlined>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <RightOutlined onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</RightOutlined>}
    </div>*/
}