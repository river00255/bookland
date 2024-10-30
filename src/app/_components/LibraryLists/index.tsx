'use client';
import { LibKeys } from '@/app/_service/keys';
import { getLibrarys } from '@/app/_service/library';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './libList.module.scss';
import { Lib } from '@/app/type';
import { regions } from '@/utils';
import Pagiantion from '../Pagination';
import Link from 'next/link';
import useModal from '@/app/_hooks/useModal';
import Modal from '../Modal';
import ModalRoot from '../Modal/ModalRoot';
import LibraryDetail from '../LibraryDetail';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const pageSize = 20;
const pageableCount = 10;

const LibraryLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);
  const [region, setRegion] = useState(11);

  const { data: session } = useSession();

  const { popup, openModal, closeModal } = useModal();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: LibKeys.libs(region, currentPage),
    queryFn: () => getLibrarys({ page: currentPage, region }),
  });

  return (
    <div>
      <div className={styles.title}>
        <h3>도서관 목록</h3>
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
        {data?.libs.map((item: { lib: Lib }) => (
          <Link
            href={`/library?libCode=${item.lib.libCode}&q=${encodeURIComponent(encodeURIComponent(JSON.stringify(item.lib)))}`}
            key={item.lib.libCode}
            onClick={() => openModal()}>
            <div className={styles.libItem}>
              <span>
                <p>
                  <strong>{item.lib.libName}</strong>
                </p>
              </span>
              <p>{item.lib.address}</p>
              {session && <button>+</button>}
            </div>
          </Link>
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
        <Modal
          isOpen={popup}
          close={() => closeModal()}
          reset={() => router.back()}>
          <LibraryDetail />
        </Modal>
      )}
      <ModalRoot />
    </div>
  );
};

export default LibraryLists;
