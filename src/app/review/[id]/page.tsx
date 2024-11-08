'use client';
import Viewer from '@/app/_components/Viewer';
import { ReviewKeys } from '@/app/_service/keys';
import { getReview } from '@/app/_service/review';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import styles from './reviewDetail.module.scss';

const ReviewDetail = () => {
  const pathname = usePathname();
  const id = pathname.replace('/review/', '');
  // console.log(pathname);

  const { data } = useQuery({
    queryKey: ReviewKeys.reviewItem(id),
    queryFn: () => getReview(id),
  });
  // console.log(data);

  if (!data) return <></>;
  return (
    <div className="container">
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
    </div>
  );
};

export default ReviewDetail;
