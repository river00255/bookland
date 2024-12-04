import { reviewQueries } from '@/app/_service/review';
import { BookReview } from '@/app/type';
import { useQuery } from '@tanstack/react-query';
import styles from './review.module.scss';
import Viewer from '../Viewer';
import Link from 'next/link';

const ReviewByBook = ({ isbn }: { isbn: string }) => {
  const { data } = useQuery(reviewQueries.byBook({ isbn }));

  return (
    <div className={styles.reviews}>
      {data?.length < 1 && <p>작성된 리뷰가 없습니다.</p>}
      {data?.map((item: BookReview) => (
        <Link
          href={`../review/${item.id}`}
          key={item.id}
          className={styles.reviewItem}>
          <Viewer
            content={`${item.review.slice(0, 72)}...`}
            style={{ fontSize: '15px' }}
          />
        </Link>
      ))}
    </div>
  );
};

export default ReviewByBook;
