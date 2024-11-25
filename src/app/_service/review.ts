import { fetcher } from '@/utils/fetcher';
import { BookReview } from '../type';
import { queryOptions } from '@tanstack/react-query';
import { ReviewKeys } from './keys';

const addReview = async (bookReview: Omit<BookReview, 'id' | 'createdAt'>) => {
  return await fetcher('POST', `../api/review`, bookReview);
};

const updateReview = async (review: BookReview) => {
  return await fetcher('PUT', `../api/review/${review.id}`, review);
};

const deleteReview = async ({ id, userId }: { id: string; userId: string }) => {
  return await fetcher('DELETE', `../api/review/${id}`, { userId });
};

export { addReview, updateReview, deleteReview };

export const reviewQueries = {
  get: (id: string | null) => {
    if (!id) throw new Error(`Not exist ${id}. failed to fetch review ${id}.`);
    return queryOptions({
      queryKey: ReviewKeys.reviewItem(id),
      queryFn: async () => await fetcher('GET', `../api/review/${id}`),
      enabled: !!id,
    });
  },
  getList: ({
    cursor,
    isPublic = true,
  }: {
    cursor: number;
    isPublic?: boolean;
  }) =>
    queryOptions({
      queryKey: ReviewKeys.allList(isPublic, cursor),
      queryFn: async () => {
        const url = isPublic
          ? `../api/review?cursor=${cursor}`
          : `../api/review?cursor=${cursor}&isPublic=1`;
        return await fetcher('GET', url);
      },
    }),
  byBook: ({ isbn }: { isbn: string }) =>
    queryOptions({
      queryKey: ReviewKeys.byBook(isbn),
      queryFn: async () => await fetcher('GET', `../api/review/book/${isbn}`),
    }),
  byUser: ({ userId, offset }: { userId: string; offset: number }) =>
    queryOptions({
      queryKey: ReviewKeys.all,
      queryFn: async () =>
        await fetcher('GET', `../api/review/list/${userId}?skip=${offset}`),
    }),
};
