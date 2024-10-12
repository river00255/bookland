'use client';
import { LibKeys } from '@/app/_service/keys';
import { getLibrarys } from '@/app/_service/library';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './libList.module.scss';
import { Lib } from '@/app/type';
import { regions } from '@/utils';
import Pagiantion from '../Pagination';

const LibraryLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);
  const [region, setRegion] = useState(11);
  const pageLimit = 10;

  const { data } = useQuery({
    queryKey: LibKeys.libs(region, currentPage),
    queryFn: () => getLibrarys({ page: currentPage, region }),
  });
  // console.log(data);

  return (
    <div>
      <div className={styles.title}>
        <h3>도서관 목록</h3>
        <select
          onChange={(e) => {
            setRegion(Number(e.target.value));
            setCurrentPage(1);
            setCurrentPageBlock(0);
          }}>
          {regions.map((region) => (
            <option key={region.code} value={region.code} defaultValue={String(region)}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.lists}>
        {data?.libs.map((item: { lib: Lib }) => (
          <div key={item.lib.libCode} className={styles.libItem}>
            <span>
              <p>
                <strong>{item.lib.libName}</strong>
              </p>
            </span>
            <p>{item.lib.address}</p>
            <button>+</button>
          </div>
        ))}
        {data && (
          <Pagiantion
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentPageBlock={currentPageBlock}
            setCurrentPageBlock={setCurrentPageBlock}
            pageLimit={pageLimit}
            totalPage={Math.ceil(data.numFound / 20)}
          />
        )}
      </div>
    </div>
  );
};

export default LibraryLists;
