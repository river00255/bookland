'use client';
import { useQuery } from '@tanstack/react-query';
import { BookmarkKeys } from '../_service/keys';
import { getBookmarkList } from '../_service/bookmark';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FavoriteBook, FavoriteLib } from '../type';
import styles from './mypage.module.scss';
import FavoriteLibrary from '../_components/FavoriteLibrary';
import Link from 'next/link';

const MyPage = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const router = useRouter();

  const { data } = useQuery({
    queryKey: BookmarkKeys.list(String(email)),
    queryFn: () => getBookmarkList(String(email)),
    enabled: !!session,
  });
  // console.log(data);

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
    </div>
  );
};

export default MyPage;
