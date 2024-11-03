'use client';
import { StoreBookItem } from '@/app/type';
import Image from 'next/image';
import styles from './detail.module.scss';
import { decode } from 'html-entities';
import { useSession } from 'next-auth/react';
import FavoriteLibraryByBook from '../FavoriteLibraryByBook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookmarkKeys } from '@/app/_service/keys';
import {
  dislikeBook,
  getFavoriteBook,
  likeBook,
} from '@/app/_service/bookmark';
import LikeBook from '../BookmarkButton/LikeBook';

const BookDetail = ({ item }: { item: StoreBookItem }) => {
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const queryClient = useQueryClient();

  const { data: favoritBook } = useQuery({
    queryKey: BookmarkKeys.bookItem(String(userId), item.isbn13),
    queryFn: () =>
      getFavoriteBook({ isbn: item.isbn13, email: String(userId) }),
    enabled: !!session,
  });

  // const { mutate: like } = useMutation({
  //   mutationFn: likeBook,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: BookmarkKeys.bookList(String(userId)),
  //     });
  //   },
  // });

  // const { mutate: dislike } = useMutation({
  //   mutationFn: dislikeBook,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: BookmarkKeys.bookList(String(userId)),
  //     });
  //   },
  // });

  return (
    <div className={styles.detail}>
      <div className={styles.intro}>
        <div className={styles.image}>
          <Image src={item.cover} alt={item.title} width={200} height={293} />
        </div>
        <div className={styles.title}>
          <p>{item.categoryName}</p>
          <h4>{item.title}</h4>
          {session?.user?.email && favoritBook && (
            <LikeBook
              prevData={favoritBook}
              userId={session.user.email}
              book={{
                name: item.title,
                isbn: item.isbn13,
                author: item.author,
                publisher: item.publisher,
                userId: session.user.email,
              }}
            />
          )}
          {/* {session &&
            favoritBook &&
            (favoritBook.length < 1 ? (
              <button
                onClick={() =>
                  like({
                    name: item.title,
                    isbn: item.isbn13,
                    author: item.author,
                    publisher: item.publisher,
                    userId: String(userId),
                  })
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#5f6368">
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() =>
                  dislike({ isbn: item.isbn13, email: String(userId) })
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#f43f5e">
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
              </button>
            ))} */}
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
        {session?.user?.email && (
          <FavoriteLibraryByBook
            email={session.user.email}
            isbn={item.isbn13}
          />
        )}
      </div>
    </div>
  );
};

export default BookDetail;
