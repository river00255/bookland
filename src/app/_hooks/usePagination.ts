import { Dispatch, SetStateAction, useCallback } from 'react';

const usePagination = ({
  currentPage,
  setCurrentPage,
  currentPageBlock,
  setCurrentPageBlock,
  totalPage,
  pageLimit,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPageBlock: number;
  setCurrentPageBlock: Dispatch<SetStateAction<number>>;
  totalPage: number;
  pageLimit: number;
}) => {
  const pageOffset = currentPageBlock * pageLimit;

  const createPageBlock = (totalPage: number) => {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  };

  const prev = useCallback(() => {
    if (currentPageBlock < 1 || currentPageBlock === 0) return;
    setCurrentPage((currentPageBlock - 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev - 1);
  }, [currentPageBlock, pageLimit, setCurrentPage, setCurrentPageBlock]);

  const next = useCallback(() => {
    if ((currentPageBlock + 1) * pageLimit >= totalPage) return;
    setCurrentPage((currentPageBlock + 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev + 1);
  }, [
    currentPageBlock,
    pageLimit,
    setCurrentPage,
    setCurrentPageBlock,
    totalPage,
  ]);

  const moveToFirst = useCallback(() => {
    setCurrentPage(1);
    setCurrentPageBlock(0);
  }, [setCurrentPage, setCurrentPageBlock]);

  const moveToLast = useCallback(() => {
    setCurrentPage(totalPage);
    setCurrentPageBlock(Math.ceil(totalPage / pageLimit) - 1);
  }, [pageLimit, setCurrentPage, setCurrentPageBlock, totalPage]);

  return { pageOffset, createPageBlock, prev, next, moveToFirst, moveToLast };
};

export default usePagination;
