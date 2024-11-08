'use client';
import { useQuery } from '@tanstack/react-query';
import { ReviewKeys } from '../_service/keys';
import { getReviewList } from '../_service/review';
import { BookReview } from '../type';
import styles from './review.module.scss';
import Link from 'next/link';

const Review = () => {
  const { data } = useQuery({
    queryKey: ReviewKeys.allList(true),
    queryFn: () => getReviewList({ cursor: 1 }),
  });
  // console.log(data);

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
