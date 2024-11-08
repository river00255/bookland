import { fetcher } from '@/utils/fetcher';
import { BookReview } from '../type';

const addReview = async (bookReview: Omit<BookReview, 'id' | 'createdAt'>) => {
  return await fetcher('POST', `../api/review`, bookReview);
};

const updateReview = async ({
  review,
}: {
  review: Omit<BookReview, 'createdAt'>;
}) => {
  return await fetcher('PUT', `../api/review/${review.id}`, review);
};

const getReview = async (id: string) => {
  return await fetcher('GET', `../api/review/${id}`);
};

const getReviewByUserId = async ({
  userId,
  cursor,
}: {
  userId: string;
  cursor: number;
}) => {
  return await fetcher('GET', `../api/review/list/${userId}/?cursor=${cursor}`);
};

const getReviewList = async ({ cursor }: { cursor: number }) => {
  return await fetcher('GET', `../api/review?cursor=${cursor}`);
};

const deleteReview = async (id: string) => {
  return await fetcher('DELETE', `../api/review/${id}`);
};

export {
  addReview,
  updateReview,
  getReview,
  getReviewByUserId,
  getReviewList,
  deleteReview,
};
