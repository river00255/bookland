'use client';
import { StoreBookItem } from '@/app/type';
import Image from 'next/image';
import styles from './detail.module.scss';
import { decode } from 'html-entities';
import { useSession } from 'next-auth/react';
import FavoriteLibraryByBook from '../FavoriteLibraryByBook';
import { useQuery } from '@tanstack/react-query';
import { BookmarkKeys } from '@/app/_service/keys';
import { getFavoriteBook } from '@/app/_service/bookmark';
import LikeBook from '../BookmarkButton/LikeBook';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import ReviewByBook from '../ReviewByBook';

const BookDetail = ({ item }: { item: StoreBookItem }) => {
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const router = useRouter();

  const moveReviewForm = useCallback((item: StoreBookItem) => {
    const book = {
      title: item.title,
      isbn: item.isbn13,
      author: item.author,
      publisher: item.publisher,
    };
    const searchParams = new URLSearchParams();
    searchParams.set('item', encodeURIComponent(JSON.stringify(book)));
    router.push(`../review/write?${searchParams.toString()}`);
  }, []);

  const { data: favoritBook } = useQuery({
    queryKey: BookmarkKeys.bookItem(String(userId), item.isbn13),
    queryFn: () =>
      getFavoriteBook({ isbn: item.isbn13, email: String(userId) }),
    enabled: !!session,
  });

  return (
    <div className={styles.detail}>
      <div className={styles.intro}>
        <div className={styles.image}>
          <Image src={item.cover} alt={item.title} width={200} height={293} />
        </div>
        <div className={styles.title}>
          <p>{item.categoryName}</p>
          <h4>{item.title}</h4>
          {userId && favoritBook && (
            <LikeBook
              prevData={favoritBook}
              userId={userId}
              book={{
                name: item.title,
                isbn: item.isbn13,
                author: item.author,
                publisher: item.publisher,
                userId,
              }}
            />
          )}
          {userId && (
            <button onClick={() => moveReviewForm(item)}>+ 리뷰 남기기</button>
          )}
          <p>{decode(item.description)}</p>
        </div>
      </div>
      <div className={styles.moreInfo}>
        {item.subInfo.cardReviewImgList &&
          item.subInfo.cardReviewImgList.map((card, i) => (
            <Image
              src={card}
              alt={String(i)}
              width={400}
              height={400}
              key={i}
            />
          ))}
      </div>
      <div className={styles.moreInfo}>
        {userId && <FavoriteLibraryByBook email={userId} isbn={item.isbn13} />}
        <ReviewByBook isbn={item.isbn13} />
      </div>
    </div>
  );
};

export default BookDetail;
