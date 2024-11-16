'use client';
import ReviewForm from '@/app/_components/ReviewForm';
import { reviewQueries } from '@/app/_service/review';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const ReviewEdit = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  // console.log(id);

  const { data } = useQuery(reviewQueries.get(id));

  return (
    <div className="container">
      {session?.user?.email && data && (
        <ReviewForm userId={session.user.email} item={data} />
      )}
    </div>
  );
};

export default ReviewEdit;
