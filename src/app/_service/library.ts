import { fetcher } from '@/utils/fetcher';

const getTrend = async () => {
  const res = await fetcher('GET', 'api/library/trend');
  return res.response;
};

export { getTrend };
