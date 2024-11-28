'use client';
import SearchForm from '@/app/_components/SearchForm';
import styles from './search.module.scss';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { StoreKeys } from '@/app/_service/keys';
import { searchBooks } from '@/app/_service/bookstore';
import { useState } from 'react';
import { StoreBookItem } from '@/app/type';
import StoreBookPreview from '@/app/_components/StoreBookPreview';
import Pagiantion from '@/app/_components/Pagination';

const pageLimit = 10;
const pageSize = 10;

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  const { data } = useQuery({
    queryKey: StoreKeys.search(String(type), String(query), currentPage),
    queryFn: () =>
      searchBooks({
        query: decodeURIComponent(String(query)),
        type: String(type),
        page: currentPage,
      }),
    enabled: !!query && !!type,
  });

  return (
    <div className="container">
      <div className={styles.form}>
        <SearchForm />
      </div>
      {data && <p>{data.totalResults}건의 검색 결과</p>}
      <div className={styles.list}>
        {data &&
          (data.totalResults < 1 ? (
            <span>검색 결과가 없습니다.</span>
          ) : (
            data.item.map((book: StoreBookItem, i: number) => (
              <StoreBookPreview key={`${book.isbn13}_${i}`} item={book} />
            ))
          ))}
        {}
      </div>
      {data && (
        <Pagiantion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentPageBlock={currentPageBlock}
          setCurrentPageBlock={setCurrentPageBlock}
          totalCount={data.totalResults}
          pageLimit={pageLimit}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default Search;
