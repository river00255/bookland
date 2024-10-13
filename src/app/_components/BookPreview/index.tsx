import { LibBookItem } from '@/app/type';
import styles from './bookPreview.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const BookPreview = ({ item }: { item: LibBookItem }) => {
  return (
    <Link href={`../book/${item.isbn13}`}>
      <div className={styles.preview}>
        <div className={styles.image}>
          <Image
            src={item.bookImageURL}
            alt={item.bookname}
            width={100}
            height={147}
            style={{ width: '100px', height: '147px' }}
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
    </Link>
  );
};

export default BookPreview;
