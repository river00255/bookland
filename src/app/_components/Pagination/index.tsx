'use client';
import { Dispatch, SetStateAction } from 'react';
import styles from './page.module.scss';
import usePagination from '@/app/_hooks/usePagination';
import Pages from './pages';

const Pagiantion = ({
  currentPage,
  setCurrentPage,
  currentPageBlock,
  setCurrentPageBlock,
  // totalPage,
  totalCount,
  pageSize,
  pageLimit,
  ...props
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPageBlock: number;
  setCurrentPageBlock: Dispatch<SetStateAction<number>>;
  // totalPage: number;
  totalCount: number;
  pageSize: number;
  pageLimit: number;
  [property: string]: any;
}) => {
  const {
    prev,
    next,
    moveToFirst,
    moveToLast,
    createPageBlock,
    pageOffset,
    totalPage,
  } = usePagination({
    currentPage,
    setCurrentPage,
    currentPageBlock,
    setCurrentPageBlock,
    totalCount,
    pageSize,
    pageLimit,
    ...props,
  });

  return (
    <div className={styles.page}>
      <button
        onClick={moveToFirst}
        disabled={currentPage === 1 || currentPageBlock === 0}>
        &lt;&lt;
      </button>
      <button
        onClick={() => prev()}
        disabled={currentPage === 1 || totalPage < 2 || currentPageBlock === 0}>
        &lt;
      </button>
      <Pages
        createPageBlock={createPageBlock}
        pageOffset={pageOffset}
        totalPage={totalPage}
        pageLimit={pageLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <button
        onClick={() => next()}
        disabled={
          currentPage === totalPage ||
          totalPage < 2 ||
          (currentPageBlock + 1) * pageLimit >= totalPage
        }>
        &gt;
      </button>
      <button
        onClick={moveToLast}
        disabled={
          currentPage === totalPage ||
          Math.ceil(totalPage / pageLimit) <= 1 ||
          (currentPageBlock + 1) * pageLimit >= totalPage
        }>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagiantion;
