import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Bestseller from './_components/Bestseller';
import TrendLists from './_components/TrendLists';
import styles from './home.module.scss';
import { LibKeys } from './_service/keys';
import { Suspense } from 'react';
import { getTrend } from './_service/library';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: LibKeys.trend,
    queryFn: () => getTrend(),
  });

  return (
    <div className={`container ${styles.main}`}>
      <Bestseller />
      <Suspense fallback={<div>Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TrendLists />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
