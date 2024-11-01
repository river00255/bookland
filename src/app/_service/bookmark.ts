import { fetcher } from '@/utils/fetcher';
import { FavoriteBook, FavoriteLib } from '../type';

const getBookmarkList = async (email: string) => {
  return await fetcher('GET', `/api/bookmark?user=${email}`);
};

const getFavoriteLib = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  return await fetcher(
    'GET',
    `../api/bookmark/library?code=${code}&user=${email}`
  );
};

const getFavoriteLibList = async (email: string) => {
  return await fetcher('GET', `../api/bookmark/library/${email}`);
};

const likeLib = async (lib: FavoriteLib) => {
  return await fetcher('POST', `../api/bookmark/library`, lib);
};

const dislikeLib = async ({ code, email }: { code: string; email: string }) => {
  return await fetcher(
    'DELETE',
    `../api/bookmark/library?code=${code}&user=${email}`
  );
};

const getFavoriteBook = async ({
  isbn,
  email,
}: {
  isbn: string;
  email: string;
}) => {
  return await fetcher(
    'GET',
    `../api/bookmark/book?isbn=${isbn}&user=${email}`
  );
};

const likeBook = async (book: FavoriteBook) => {
  return await fetcher('POST', `../api/bookmark/book`, book);
};

const dislikeBook = async ({
  isbn,
  email,
}: {
  isbn: string;
  email: string;
}) => {
  return await fetcher(
    'DELETE',
    `../api/bookmark/book?isbn=${isbn}&user=${email}`
  );
};

export {
  getBookmarkList,
  getFavoriteLib,
  likeLib,
  dislikeLib,
  getFavoriteBook,
  likeBook,
  dislikeBook,
  getFavoriteLibList,
};
