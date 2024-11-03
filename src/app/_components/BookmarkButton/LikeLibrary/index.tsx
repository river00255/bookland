import { dislikeLib, getFavoriteLib, likeLib } from '@/app/_service/bookmark';
import { BookmarkKeys } from '@/app/_service/keys';
import { FavoriteLib } from '@/app/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const LikeLibrary = <T,>({
  prevData,
  userId,
  lib,
  // arg,
  // callback,
}: {
  prevData: FavoriteLib[];
  userId: string;
  lib: FavoriteLib;
  // arg?: T;
  // callback?: (arg: T) => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate: like } = useMutation({
    mutationFn: likeLib,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: BookmarkKeys.libList(userId),
      }),
  });

  const { mutate: dislike } = useMutation({
    mutationFn: dislikeLib,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: BookmarkKeys.libList(userId),
      }),
  });

  return (
    <>
      {prevData.length > 0 ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // arg && callback && callback(arg);
            dislike({
              code: lib.code,
              email: userId,
            });
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#22c55e">
            <path d="M200-440v-80h560v80H200Z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // arg && callback && callback(arg);
            like({
              name: lib.name,
              code: lib.code,
              region: lib.region,
              userId: userId,
            });
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#5f6368">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default LikeLibrary;
