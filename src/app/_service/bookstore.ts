import { fetcher } from '@/utils/fetcher';

const getBestseller = async () => {
  return await fetcher('GET', 'api/bookstore/list');
};

const searchBooks = async ({ query, type, page }: { query: string; type: string; page: number }) => {
  return await fetcher('GET', `/api/bookstore/search?query=${query}&type${type}&page=${page}`);
};

export { getBestseller, searchBooks };
