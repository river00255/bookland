import { Dispatch, SetStateAction } from 'react';

const Pages = ({
  currentPage,
  setCurrentPage,
  totalPage,
  pageLimit,
  pageOffset,
  createPageBlock,
  setUrlSearchParams,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
  pageLimit: number;
  pageOffset: number;
  createPageBlock: (totalPage: number) => number[];
  setUrlSearchParams: (currentPage: number, pageSize: number) => void;
}) => {
  if (
    createPageBlock(totalPage).slice(pageOffset, pageOffset + pageLimit)
      .length < 1
  )
    return <button data-index={currentPage}>1</button>;
  return createPageBlock(totalPage)
    .slice(pageOffset, pageOffset + pageLimit)
    .map((i) => (
      <button
        key={i}
        data-index={currentPage === i ? i : null}
        onClick={() => {
          setCurrentPage(i);
          setUrlSearchParams(i, pageLimit);
        }}>
        {i}
      </button>
    ));
};

export default Pages;
