'use client';
import { LibKeys } from '@/app/_service/keys';
import { getTrend } from '@/app/_service/library';
import { Books } from '@/app/type';
import { useQuery } from '@tanstack/react-query';
import BookPreview from '../BookPreview';
import styles from './trend.module.scss';

const TrendLists = () => {
  const { data } = useQuery({
    queryKey: LibKeys.trend,
    queryFn: () => getTrend(),
  });
  // console.log(data?.results[1]);

  return (
    <div>
      <div className={styles.title}>
        <h3>대출 급상승 도서</h3>
        <p>기준일: {data?.results[1].result.date}</p>
      </div>
      <div className={styles.lists}>
        {data?.results[1].result.docs.map((item: { doc: Books }) => (
          <BookPreview key={item.doc.isbn13} item={item.doc} />
        ))}
      </div>
    </div>
  );
};

export default TrendLists;
