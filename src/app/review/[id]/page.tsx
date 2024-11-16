'use client';
import Viewer from '@/app/_components/Viewer';
import { reviewQueries } from '@/app/_service/review';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import styles from './reviewDetail.module.scss';
import { useSession } from 'next-auth/react';

const ReviewDetail = () => {
  const pathname = usePathname();
  const id = pathname.replace('/review/', '');
  const router = useRouter();
  // console.log(pathname);
  const { data: session } = useSession();

  const { data } = useQuery(reviewQueries.get(id));
  // console.log(data);

  if (!data) return <></>;
  return (
    <div className={`container ${styles.review}`}>
      <div className={styles.detail}>
        <span>
          <h4>{data.title}</h4>
          <p>
            {data.author} / {data.publisher}
          </p>
        </span>
        <p>{new Date(data.createdAt).toLocaleDateString()}</p>
        <hr />
        <Viewer content={data.review} />
      </div>
      {session?.user?.email === data.userId && (
        <button onClick={() => router.push(`../review/edit?id=${id}`)}>
          수정
        </button>
      )}
    </div>
  );
};

export default ReviewDetail;
