'use client';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './searchForm.module.scss';
import { useRouter } from 'next/navigation';

type QueryType = 'Title' | 'Author' | 'Publisher';

const SearchForm = () => {
  const [type, setType] = useState<QueryType>('Title');
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const searching = (q: string, type: QueryType) => {
    const searchParams = new URLSearchParams();
    searchParams.set('query', encodeURIComponent(q));
    searchParams.set('type', type);
    router.push(`/book/search?${searchParams.toString()}`);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef.current || inputRef.current.value.trim().length < 1) return;
    const inputValue = inputRef.current.value.trim().replaceAll(' ', '+');
    searching(inputValue, type);
    // console.log(type, inputValue);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div>
        <select onChange={(e) => setType(e.target.value as QueryType)}>
          <option value="Title">제목</option>
          <option value="Author">저자</option>
          <option value="Publisher">출판사</option>
        </select>
        <input type="text" ref={inputRef} placeholder="검색어를 입력하세요" />
      </div>
      <button>검 색</button>
    </form>
  );
};

export default SearchForm;
