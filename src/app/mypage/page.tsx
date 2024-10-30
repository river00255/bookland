'use client';
import { useQuery } from '@tanstack/react-query';
import { BookmarkKeys } from '../_service/keys';
import { getBookmarkList } from '../_service/bookmark';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const MyPage = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { data } = useQuery({
    queryKey: BookmarkKeys.list(String(email)),
    queryFn: () => getBookmarkList(String(email)),
    enabled: !!session,
  });
  console.log(data);

  return <></>;
};

export default MyPage;
