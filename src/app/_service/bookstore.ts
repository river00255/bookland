import { fetcher } from '@/utils/fetcher';

const getBestseller = async () => {
  return await fetcher('GET', '../api/bookstore/best');
};

const searchBooks = async ({
  query,
  type,
  page,
}: {
  query: string;
  type: string;
  page: number;
}) => {
  return await fetcher(
    'GET',
    `../api/bookstore/search?query=${query}&type=${type}&page=${page}`
  );
};

const getBookDetail = async ({ isbn }: { isbn: string }) => {
  return await fetcher('GET', `../api/bookstore/book/${isbn}`);
};

export { getBestseller, searchBooks, getBookDetail };
