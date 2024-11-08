'use client';
import ReviewForm from '@/app/_components/ReviewForm';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const WriteReview = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const item = JSON.parse(decodeURIComponent(String(searchParams.get('item'))));

  if (status === 'loading') return <div className="container">Loading...</div>;
  if (status === 'unauthenticated')
    return (
      <div className="container">
        <button onClick={() => router.replace('/')}>Go Home</button>
      </div>
    );
  return (
    <div className="container">
      {session?.user?.email && item && (
        <ReviewForm userId={session.user.email} item={item} />
      )}
    </div>
  );
};

export default WriteReview;
