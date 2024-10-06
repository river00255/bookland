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

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  const { data } = useQuery({
    queryKey: StoreKeys.search(String(type), String(query), currentPage),
    queryFn: () => searchBooks({ query: decodeURIComponent(String(query)), type: String(type), page: currentPage }),
    enabled: !!query && !!type,
  });
  // console.log(data);

  return (
    <div className="container">
      <div className={styles.form}>
        <SearchForm />
      </div>
      <div className={styles.list}>
        {data?.totalResults < 1 && <span>검색 결과가 없습니다.</span>}
        {data?.item.map((book: StoreBookItem) => <StoreBookPreview key={book.isbn13} item={book} />)}
      </div>
    </div>
  );
};

export default Search;
