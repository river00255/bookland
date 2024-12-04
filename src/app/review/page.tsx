'use client';
import { useQuery } from '@tanstack/react-query';
import { reviewQueries } from '../_service/review';
import { BookReview } from '../type';
import styles from './review.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import Pagiantion from '../_components/Pagination';

const pageSize = 20;
const pageableCount = 10;

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);
  const [cursor, setCursor] = useState(1);
  // console.log(cursor);

  const { data } = useQuery(reviewQueries.getList({ cursor }));

  return (
    <div className={`container ${styles.review}`}>
      <h3>리 뷰</h3>
      <div className={styles.list}>
        {data?.totalCount < 1 && (
          <div>
            <p>아직 작성된 독서 후기가 없습니다.</p>
          </div>
        )}
        {data?.review.map((item: BookReview) => (
          <div key={item.id} className={styles.reviewItem}>
            <Link href={`../review/${item.id}`}>
              <p>{item.title}</p>
            </Link>
            <p>{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      {data?.totalCount > 0 && (
        <Pagiantion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentPageBlock={currentPageBlock}
          setCurrentPageBlock={setCurrentPageBlock}
          pageLimit={pageableCount}
          totalCount={data.totalCount}
          pageSize={pageSize}
          cursor={cursor}
          setCursor={setCursor}
        />
      )}
    </div>
  );
};

export default Review;
