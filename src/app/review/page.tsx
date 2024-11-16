'use client';
import { useQuery } from '@tanstack/react-query';
import { reviewQueries } from '../_service/review';
import { BookReview } from '../type';
import styles from './review.module.scss';
import Link from 'next/link';

const Review = () => {
  const { data } = useQuery(reviewQueries.getList({ cursor: 1 }));

  return (
    <div className={`container ${styles.list}`}>
      {data?.review.map((item: BookReview) => (
        <div key={item.id} className={styles.reviewItem}>
          <Link href={`../review/${item.id}`}>
            <p>{item.title}</p>
          </Link>
          <p>{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
