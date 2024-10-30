import { fetcher } from '@/utils/fetcher';

const getBookmarkList = async (email: string) => {
  return await fetcher('GET', `/api/bookmark?user=${email}`);
};

const likeLib = async ({ code, email }: { code: string; email: string }) => {
  return await fetcher('POST', `../api/bookmark?code=${code}&user=${email}`);
};

const dislikeLib = async ({ code, email }: { code: string; email: string }) => {
  return await fetcher('DELETE', `../api/bookmark?code=${code}&user=${email}`);
};

export { getBookmarkList };
