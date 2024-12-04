import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LibraryLists from '../_components/LibraryLists';
import styles from './libs.module.scss';
import { LibKeys } from '../_service/keys';
import { getLibrarys } from '../_service/library';
import { Suspense } from 'react';
import Loading from '../loading';
import { regions } from '@/utils';

const Library = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: LibKeys.libs(regions[0].code, 1),
    queryFn: () => getLibrarys({ page: 1, region: regions[0].code }),
  });

  return (
    <div className={`container ${styles.main}`}>
      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LibraryLists />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};

export default Library;
