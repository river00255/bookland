import useModal from '@/app/_hooks/useModal';
import { Lib } from '@/app/type';
import { Session } from 'next-auth';
import Link from 'next/link';
import styles from './libItem.module.scss';
import Modal from '../Modal';
import LibraryDetail from '../LibraryDetail';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dislikeLib, getFavoriteLib, likeLib } from '@/app/_service/bookmark';
import { BookmarkKeys } from '@/app/_service/keys';

const LibraryPreview = ({
  lib,
  session,
  region,
}: {
  lib: Lib;
  session: Session | null;
  region: number;
}) => {
  const { popup, openModal, closeModal } = useModal();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: BookmarkKeys.libItem(String(session?.user?.email), lib.libCode),
    queryFn: () =>
      getFavoriteLib({
        code: lib.libCode,
        email: String(session?.user?.email),
      }),
    enabled: !!session,
  });
  // console.log(data);

  const queryClient = useQueryClient();

  const { mutate: like } = useMutation({
    mutationFn: likeLib,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: BookmarkKeys.libList(String(session?.user?.email)),
      }),
  });

  const { mutate: dislike } = useMutation({
    mutationFn: dislikeLib,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: BookmarkKeys.libList(String(session?.user?.email)),
      }),
  });

  return (
    <>
      <Link
        href={`../library?libCode=${lib.libCode}&q=${encodeURIComponent(encodeURIComponent(JSON.stringify(lib)))}`}
        key={lib.libCode}
        onClick={() => openModal()}>
        <div className={styles.item}>
          <span>
            <p>
              <strong>{lib.libName}</strong>
            </p>
          </span>
          <p>{lib.address}</p>
          {session &&
            (data?.length > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dislike({
                    code: lib.libCode,
                    email: String(session.user?.email),
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
                  like({
                    name: lib.libName,
                    code: lib.libCode,
                    region,
                    userId: String(session.user?.email),
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
            ))}
        </div>
      </Link>
      {popup && (
        <Modal
          isOpen={popup}
          close={() => closeModal()}
          reset={() => router.back()}>
          <LibraryDetail />
        </Modal>
      )}
    </>
  );
};

export default LibraryPreview;
