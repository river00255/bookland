import { reviewQueries } from '@/app/_service/review';
import { BookReview } from '@/app/type';
import { useQuery } from '@tanstack/react-query';
import styles from './review.module.scss';
import Viewer from '../Viewer';
import Link from 'next/link';

const ReviewByBook = ({ isbn }: { isbn: string }) => {
  const { data } = useQuery(reviewQueries.byBook({ isbn }));
  // console.log(data);

  return (
    <div className={styles.reviews}>
      {data?.map((item: BookReview) => (
        <div key={item.id} className={styles.reviewItem}>
          <Link href={`../review/${item.id}`}>
            <Viewer content={`${item.review.slice(0, 85)}...`} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReviewByBook;
