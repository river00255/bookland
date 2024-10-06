import { StoreBookItem } from '@/app/type';
import Image from 'next/image';
import styles from './storeBookPreview.module.scss';

const StoreBookPreview = ({ item }: { item: StoreBookItem }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.image}>
        <Image src={item.cover} alt={item.title} width={85} height={126} style={{ width: '85px', height: '126px' }} />
      </div>
      <div className={styles.text}>
        <span>
          <p>{item.author}</p>
        </span>
        <p>
          <strong>{item.title}</strong>
        </p>
      </div>
    </div>
  );
};

export default StoreBookPreview;