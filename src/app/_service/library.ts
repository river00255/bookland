import { fetcher } from '@/utils/fetcher';

const getTrend = async () => {
  const res = await fetcher('GET', '../api/library/trend');
  return res.response;
};

const getLibrarys = async ({
  page,
  region,
}: {
  page: number;
  region: number;
}) => {
  const res = await fetcher(
    'GET',
    `../api/library?region=${region}&page=${page}`
  );
  return res.response;
};

const getLibraryDetail = async ({ libCode }: { libCode: string }) => {
  const res = await fetcher('GET', `../api/library/extends?libCode=${libCode}`);
  return res.response;
};

const getLoanStatus = async ({
  libCode,
  isbn,
}: {
  libCode: string;
  isbn: string;
}) => {
  const res = await fetcher(
    'GET',
    `../api/library/loan?libCode=${libCode}&isbn=${isbn}`
  );
  return res.response;
};

export { getTrend, getLibrarys, getLibraryDetail, getLoanStatus };
