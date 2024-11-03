'use client';
import { FavoriteLib } from '@/app/type';
import LikeLibrary from '../BookmarkButton/LikeLibrary';
import Link from 'next/link';
import styles from './favoriteLib.module.scss';

const FavoriteLibrary = ({
  item,
  libs,
  userId,
}: {
  item: FavoriteLib;
  libs: FavoriteLib[];
  userId: string;
}) => {
  return (
    <Link href={`../library/${item.code}`}>
      <div className={styles.lib}>
        <p>{item.name}</p>
        <LikeLibrary prevData={libs} lib={item} userId={userId} />
      </div>
    </Link>
  );
};

export default FavoriteLibrary;
