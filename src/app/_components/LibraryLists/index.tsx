'use client';
import { BookmarkKeys, LibKeys } from '@/app/_service/keys';
import { getLibrarys } from '@/app/_service/library';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './libList.module.scss';
import { FavoriteLib, Lib } from '@/app/type';
import { regions } from '@/utils';
import Pagiantion from '../Pagination';
import useModal from '@/app/_hooks/useModal';
import Modal from '../Modal';
import { useSession } from 'next-auth/react';
import LibraryPreview from '../LibraryPreview';
import { getFavoriteLibList } from '@/app/_service/bookmark';
import FavoriteLibrary from '../FavoriteLibrary';
import Loading from '@/app/loading';
import { useRouter, useSearchParams } from 'next/navigation';

const pageSize = 20;
const pageableCount = 10;

const LibraryLists = () => {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);
  const [region, setRegion] = useState(
    Number(currentSearchParams.get('region')) || 11
  );

  const { data: session } = useSession();

  const { popup, openModal, closeModal } = useModal();

  const { data, isLoading } = useQuery({
    queryKey: LibKeys.libs(region, currentPage),
    queryFn: () => getLibrarys({ page: currentPage, region }),
  });

  const { data: favoriteLibs } = useQuery({
    queryKey: BookmarkKeys.libList(String(session?.user?.email)),
    queryFn: () => getFavoriteLibList(String(session?.user?.email)),
    enabled: !!session,
  });

  const setSearchParams = (region: number) => {
    const searchParams = new URLSearchParams(currentSearchParams.toString());
    searchParams.set('region', String(region));
    searchParams.set('page', '1');
    searchParams.set('block', '0');
    router.push(`library?${searchParams.toString()}`);
  };

  return (
    <div>
      <div className={styles.title}>
        <h3>도서관 목록</h3>
        {session && (
          <button onClick={() => openModal()} className={styles.myList}>
            나의 도서관
          </button>
        )}
        {data && <p>{data.numFound} 곳</p>}
        <select
          defaultValue={currentSearchParams.get('region') || region}
          onChange={(e) => {
            setRegion(Number(e.target.value));
            setSearchParams(Number(e.target.value));
          }}>
          {regions.map((region) => (
            <option key={region.code} value={region.code}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.lists}>
        {isLoading && <Loading />}
        {data &&
          data.libs.map((item: { lib: Lib }) => (
            <LibraryPreview
              lib={item.lib}
              session={session}
              region={region}
              key={item.lib.libCode}
            />
          ))}
      </div>
      {data && (
        <Pagiantion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentPageBlock={currentPageBlock}
          setCurrentPageBlock={setCurrentPageBlock}
          pageLimit={pageableCount}
          totalCount={data.numFound}
          pageSize={pageSize}
        />
      )}
      {popup && (
        <Modal isOpen={popup} close={() => closeModal()}>
          {session &&
            favoriteLibs &&
            favoriteLibs.map((item: FavoriteLib) => (
              <FavoriteLibrary
                item={item}
                libs={favoriteLibs}
                userId={String(session.user?.email)}
                key={item.code}
              />
            ))}
        </Modal>
      )}
    </div>
  );
};

export default LibraryLists;
