'use client';
import { LibKeys } from '@/app/_service/keys';
import { getTrend } from '@/app/_service/library';
import { LibBookItem } from '@/app/type';
import { useQuery } from '@tanstack/react-query';
import BookPreview from '../BookPreview';
import styles from './trend.module.scss';
import Skeleton from '../Skeleton';

const TrendLists = () => {
  const { data, isLoading } = useQuery({
    queryKey: LibKeys.trend,
    queryFn: () => getTrend(),
  });

  return (
    <div>
      <div className={styles.title}>
        <h3>대출 급상승 도서</h3>
        <p>기준일: {data && data.results[1].result.date}</p>
      </div>
      <div className={styles.lists}>
        {isLoading && <Skeleton />}
        {data &&
          data.results[1].result.docs.map((item: { doc: LibBookItem }) => (
            <BookPreview key={item.doc.isbn13} item={item.doc} />
          ))}
      </div>
    </div>
  );
};

export default TrendLists;
