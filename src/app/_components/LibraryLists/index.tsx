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
import ModalRoot from '../Modal/ModalRoot';
import { useSession } from 'next-auth/react';
import LibraryPreview from '../LibraryPreview';
import { getFavoriteLibList } from '@/app/_service/bookmark';
import FavoriteLibrary from '../FavoriteLibrary';

const pageSize = 20;
const pageableCount = 10;

const LibraryLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);
  const [region, setRegion] = useState(11);

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
  // console.log(favoriteLibs);

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
          onChange={(e) => {
            setRegion(Number(e.target.value));
            setCurrentPage(1);
            setCurrentPageBlock(0);
          }}>
          {regions.map((region) => (
            <option
              key={region.code}
              value={region.code}
              defaultValue={String(region)}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.lists}>
        {isLoading && <div>Loading...</div>}
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
          totalPage={Math.ceil(data.numFound / pageSize)}
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
      <ModalRoot />
    </div>
  );
};

export default LibraryLists;
