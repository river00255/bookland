import { fetcher } from '@/utils/fetcher';

const getBestseller = async () => {
  return await fetcher('GET', 'api/bookstore/list');
};

export { getBestseller };
