import { fetcher } from '@/utils/fetcher';

const getTrend = async () => {
  const res = await fetcher('GET', 'api/library/trend');
  return res.response;
};

const getLibrarys = async ({ page, region }: { page: number; region: number }) => {
  const res = await fetcher('GET', `/api/library?region=${region}&page=${page}`);
  return res.response;
};

export { getTrend, getLibrarys };
