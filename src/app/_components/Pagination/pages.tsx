import { Dispatch, SetStateAction } from 'react';

const Pages = ({
  currentPage,
  setCurrentPage,
  totalPage,
  pageLimit,
  pageOffset,
  createPageBlock,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
  pageLimit: number;
  pageOffset: number;
  createPageBlock: (totalPage: number) => number[];
}) => {
  return createPageBlock(totalPage)
    .slice(pageOffset, pageOffset + pageLimit)
    .map((i) => (
      <button
        key={i}
        data-index={currentPage === i ? i : null}
        onClick={() => setCurrentPage(i)}>
        {i}
      </button>
    ));
};

export default Pages;
