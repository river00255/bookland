'use client';
import { useQuery } from '@tanstack/react-query';
import { BookmarkKeys } from '../_service/keys';
import { getBookmarkList } from '../_service/bookmark';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FavoriteBook, FavoriteLib } from '../type';
import styles from './mypage.module.scss';

const MyPage = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { data } = useQuery({
    queryKey: BookmarkKeys.list(String(email)),
    queryFn: () => getBookmarkList(String(email)),
    enabled: !!session,
  });
  // console.log(data);

  return (
    <div className={`container ${styles.mypage}`}>
      <p>{session?.user?.email} 님</p>
      <div className={styles.content}>
        <h4>즐겨찾는 도서관</h4>
        {data?.bookmark?.lib?.length < 1 ? (
          <div>
            <p>즐겨찾기한 도서관이 없습니다.</p>
          </div>
        ) : (
          data?.bookmark?.lib?.map((item: FavoriteLib) => (
            <div key={item.code}>
              <p>{item.name}</p>
            </div>
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
            <div key={item.isbn}>
              <p>{item.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPage;
