import { StoreBookItem } from '@/app/type';
import Image from 'next/image';
import styles from './detail.module.scss';
import { decode } from 'html-entities';

const BookDetail = ({ item }: { item: StoreBookItem }) => {
  return (
    <div className={styles.detail}>
      <div className={styles.intro}>
        <div className={styles.image}>
          <Image src={item.cover} alt={item.title} width={200} height={293} />
        </div>
        <div className={styles.title}>
          <p>{item.categoryName}</p>
          <h4>{item.title}</h4>
          <p>{decode(item.description)}</p>
        </div>
      </div>
      <div className={styles.moreInfo}>
        {item.subInfo.cardReviewImgList &&
          item.subInfo.cardReviewImgList.map((card, i) => (
            <Image src={card} alt={String(i)} width={400} height={400} key={i} />
          ))}
      </div>
    </div>
  );
};

export default BookDetail;
