import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearchParams = searchParams.toString();

  const setUrlSearchParams = useCallback(
    (currentPage: number, pageLimit: number) => {
      const searchParams = new URLSearchParams(currentSearchParams);
      searchParams.set('page', String(currentPage));
      searchParams.set('block', String(Math.ceil(currentPage / pageLimit) - 1));
      router.push(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const totalPage = Math.ceil(totalCount / pageSize);

  const pageOffset = currentPageBlock * pageLimit;

  const createPageBlock = (totalPage: number) => {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  };

  const prev = useCallback(() => {
    if (currentPageBlock < 1 || currentPageBlock === 0) return;
    setCurrentPage((currentPageBlock - 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev - 1);
    setUrlSearchParams((currentPageBlock - 1) * pageLimit + 1, pageLimit);
  }, [
    currentPageBlock,
    pageLimit,
    setCurrentPage,
    setCurrentPageBlock,
    setUrlSearchParams,
  ]);

  const next = useCallback(() => {
    if ((currentPageBlock + 1) * pageLimit >= totalPage) return;
    setCurrentPage((currentPageBlock + 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev + 1);
    setUrlSearchParams((currentPageBlock + 1) * pageLimit + 1, pageLimit);
  }, [
    currentPageBlock,
    pageLimit,
    setCurrentPage,
    setCurrentPageBlock,
    totalPage,
    setUrlSearchParams,
  ]);

  const moveToFirst = useCallback(() => {
    setCurrentPage(1);
    setCurrentPageBlock(0);
    setUrlSearchParams(1, pageLimit);
  }, [setCurrentPage, setCurrentPageBlock, setUrlSearchParams, pageLimit]);

  const moveToLast = useCallback(() => {
    setCurrentPage(totalPage);
    setCurrentPageBlock(Math.ceil(totalPage / pageLimit) - 1);
    setUrlSearchParams(totalPage, pageLimit);
  }, [
    pageLimit,
    setCurrentPage,
    setCurrentPageBlock,
    totalPage,
    setUrlSearchParams,
  ]);

  useEffect(() => {
    if (cursor && setCursor && currentPage > 1)
      setCursor(currentPage * pageSize);
  }, [currentPage]);

  useEffect(() => {
    const pageParams = Number(searchParams.get('page'));
    const blockParams = Number(searchParams.get('block'));
    if (pageParams > 0 && pageParams !== currentPage) {
      setCurrentPage(pageParams);
      if (blockParams > 0) setCurrentPageBlock(blockParams);
    }
  }, [currentPage, searchParams]);

  return {
    pageOffset,
    createPageBlock,
    prev,
    next,
    moveToFirst,
    moveToLast,
    totalPage,
    setUrlSearchParams,
  };
};

export default usePagination;
