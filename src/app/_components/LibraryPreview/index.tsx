import { Lib } from '@/app/type';
import { Session } from 'next-auth';
import Link from 'next/link';
import styles from './libItem.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getFavoriteLib } from '@/app/_service/bookmark';
import { BookmarkKeys } from '@/app/_service/keys';
import LikeLibrary from '../BookmarkButton/LikeLibrary';

const LibraryPreview = ({
  lib,
  session,
  region,
}: {
  lib: Lib;
  session: Session | null;
  region: number;
}) => {
  const { data } = useQuery({
    queryKey: BookmarkKeys.libItem(String(session?.user?.email), lib.libCode),
    queryFn: () =>
      getFavoriteLib({
        code: lib.libCode,
        email: String(session?.user?.email),
      }),
    enabled: !!session,
  });

  return (
    <Link href={`../library/${lib.libCode}`} key={lib.libCode}>
      <div className={styles.item}>
        <span>
          <p>
            <strong>{lib.libName}</strong>
          </p>
        </span>
        <p>{lib.address}</p>
        <div className={styles.like}>
          {session?.user?.email && data && (
            <LikeLibrary
              prevData={data}
              userId={session.user.email}
              lib={{
                name: lib.libName,
                code: lib.libCode,
                region,
                userId: session.user.email,
              }}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default LibraryPreview;
