'use client';
import { useQuery } from '@tanstack/react-query';
import { BookmarkKeys } from '../_service/keys';
import { getBookmarkList } from '../_service/bookmark';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookReview, FavoriteBook, FavoriteLib } from '../type';
import styles from './mypage.module.scss';
import FavoriteLibrary from '../_components/FavoriteLibrary';
import Link from 'next/link';
import { reviewQueries } from '../_service/review';
import useModal from '../_hooks/useModal';
import Modal from '../_components/Modal';

const MyPage = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const { popup, openModal, closeModal } = useModal();

  const router = useRouter();

  const { data } = useQuery({
    queryKey: BookmarkKeys.list(String(email)),
    queryFn: () => getBookmarkList(String(email)),
    enabled: !!session,
  });
  // console.log(data);

  const { data: reviews } = useQuery(
    reviewQueries.byUser({ userId: String(email), offset: 0 })
  );
  // console.log(reviews);

  if (status === 'loading') return <div className="container">Loading...</div>;
  if (status === 'unauthenticated')
    return (
      <div className="container">
        <button onClick={() => router.replace('/')}>Go Home</button>
      </div>
    );
  return (
    <div className={`container ${styles.mypage}`}>
      <p>{session?.user?.email} 님</p>
      <div className={styles.content}>
        <button onClick={() => openModal()}>나의 독서후기</button>
      </div>
      <div className={styles.content}>
        <h4>즐겨찾는 도서관</h4>
        {data?.bookmark?.lib?.length < 1 ? (
          <div>
            <p>즐겨찾기한 도서관이 없습니다.</p>
          </div>
        ) : (
          data?.bookmark?.lib?.map((item: FavoriteLib) => (
            <FavoriteLibrary
              item={item}
              libs={data.bookmark.lib}
              userId={String(session?.user?.email)}
              key={item.code}
            />
          ))
        )}
      </div>
      <div className={styles.content}>
        <h4>관심 도서</h4>
        {data?.bookmark?.book?.length < 1 ? (
          <div>
            <p>아직 관심 도서가 없습니다.</p>
          </div>
        ) : (
          data?.bookmark?.book?.map((item: FavoriteBook) => (
            <Link href={`../book/${item.isbn}`} key={item.isbn}>
              <div>
                <p>{item.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>
      {popup && (
        <Modal isOpen={popup} close={() => closeModal()}>
          <div className={styles.reviews}>
            <h4>독서 후기</h4>
            {reviews &&
              reviews.review.map((review: BookReview) => (
                <div key={review.id}>
                  <Link href={`../review/${review.id}`}>{review.title}</Link>
                </div>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyPage;
