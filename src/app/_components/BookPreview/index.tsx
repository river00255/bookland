import { Books } from '@/app/type';
import styles from './bookPreview.module.scss';
import Image from 'next/image';

const BookPreview = ({ item }: { item: Books }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.image}>
        <Image
          src={item.bookImageURL}
          alt={item.bookname}
          width={200}
          height={294}
          style={{ width: '200px', height: '294px' }}
        />
      </div>
      <div className={styles.text}>
        <p>{item.class_nm}</p>
        <p>{item.authors}</p>
        <p>
          <strong>{item.bookname}</strong>
        </p>
      </div>
    </div>
  );
};

export default BookPreview;
