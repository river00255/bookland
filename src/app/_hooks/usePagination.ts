import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

const usePagination = ({
  currentPage,
  setCurrentPage,
  currentPageBlock,
  setCurrentPageBlock,
  totalCount,
  pageSize,
  pageLimit,
  ...props
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPageBlock: number;
  setCurrentPageBlock: Dispatch<SetStateAction<number>>;
  totalCount: number;
  pageSize: number;
  pageLimit: number;
  [property: string]: any;
}) => {
  const { cursor, setCursor, offset, setOffset } = props;

  const totalPage = Math.ceil(totalCount / pageSize);

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

  useEffect(() => {
    if (cursor && setCursor && currentPage > 1)
      setCursor(currentPage * pageSize);
  }, [currentPage]);

  return {
    pageOffset,
    createPageBlock,
    prev,
    next,
    moveToFirst,
    moveToLast,
    totalPage,
  };
};

export default usePagination;
