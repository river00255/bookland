'use client';
import { getBestseller } from '@/app/_service/bookstore';
import { StoreKeys } from '@/app/_service/keys';
import { StoreBookItem } from '@/app/type';
import { useQuery } from '@tanstack/react-query';
import StoreBookPreview from '../StoreBookPreview';
import styles from './best.module.scss';

const Bestseller = () => {
  const { data } = useQuery({
    queryKey: StoreKeys.best,
    queryFn: () => getBestseller(),
  });
  // console.log(data);

  return (
    <div>
      <div className={styles.title}>
        <h3>베스트셀러</h3>
      </div>
      <div className={styles.lists}>
        {data?.item.map((item: StoreBookItem) => <StoreBookPreview key={item.isbn13} item={item} />)}
      </div>
    </div>
  );
};

export default Bestseller;
