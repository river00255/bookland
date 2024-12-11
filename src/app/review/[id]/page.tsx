'use client';
import Viewer from '@/app/_components/Viewer';
import { reviewQueries } from '@/app/_service/review';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import styles from './reviewDetail.module.scss';
import { useSession } from 'next-auth/react';

const maskingEmail = (email: string) => {
  const id = `${email.split('@')[0].slice(0, 2)}***${email.split('@')[0].slice(-1)}`;
  const mail = email.split('@')[1];
  return `${id}@${mail}`;
};

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
        <p style={{ color: '#bdbdbd' }}>{maskingEmail(data.userId)}</p>
        <Viewer content={data.review} style={{ marginTop: '12px' }} />
      </div>
      {session?.user?.email === data.userId && (
        <button
          onClick={() => router.push(`../review/edit?id=${id}`)}
          className={styles.editButton}>
          수정
        </button>
      )}
    </div>
  );
};

export default ReviewDetail;
