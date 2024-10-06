import { QueryClient } from '@tanstack/react-query';
import Bestseller from './_components/Bestseller';
import TrendLists from './_components/TrendLists';
import styles from './home.module.scss';
import { StoreKeys } from './_service/keys';
import { getBestseller } from './_service/bookstore';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: StoreKeys.best,
    queryFn: () => getBestseller(),
  });

  return (
    <div className={`container ${styles.main}`}>
      <TrendLists />
      <Bestseller />
    </div>
  );
}
