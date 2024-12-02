import { dislikeBook, likeBook } from '@/app/_service/bookmark';
import { BookmarkKeys } from '@/app/_service/keys';
import { FavoriteBook } from '@/app/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LikeBook = ({
  prevData,
  userId,
  book,
}: {
  prevData: FavoriteBook[];
  userId: string;
  book: FavoriteBook;
}) => {
  const queryClient = useQueryClient();

  const { mutate: like } = useMutation({
    mutationFn: likeBook,
    onMutate: () => {
      queryClient.setQueryData(
        BookmarkKeys.bookItem(userId, book.isbn),
        (prev: FavoriteBook | null) => (!prev ? { ...book, userId } : null)
      );
      return { ...book, userId };
    },
    onError: () => {
      queryClient.setQueryData(
        BookmarkKeys.bookItem(userId, book.isbn),
        queryClient.getQueryData(BookmarkKeys.bookItem(userId, book.isbn))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: BookmarkKeys.bookList(userId),
      });
    },
  });

  const { mutate: dislike } = useMutation({
    mutationFn: dislikeBook,
    onMutate: () => {
      queryClient.setQueryData(
        BookmarkKeys.bookItem(userId, book.isbn),
        (prev: FavoriteBook | null) => (prev ? null : { ...book, userId })
      );
      return null;
    },
    onError: () => {
      queryClient.setQueryData(
        BookmarkKeys.bookItem(userId, book.isbn),
        queryClient.getQueryData(BookmarkKeys.bookItem(userId, book.isbn))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: BookmarkKeys.bookList(userId),
      });
    },
  });

  return (
    <>
      {prevData.length < 1 ? (
        <button
          onClick={() =>
            like({
              ...book,
              userId,
            })
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#5f6368">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </button>
      ) : (
        <button onClick={() => dislike({ isbn: book.isbn, email: userId })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#f43f5e">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default LikeBook;
