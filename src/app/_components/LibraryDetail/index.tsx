'use client';
import { Lib } from '@/app/type';
import Map from '../Map';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { LibKeys } from '@/app/_service/keys';
import { getLibraryDetail } from '@/app/_service/library';
import { useEffect, useState } from 'react';
import styles from './libDetail.module.scss';

const LibraryDetail = () => {
  const searchParams = useSearchParams();

  const [lib, setLib] = useState<Lib | undefined>();

  // console.log(JSON.parse(decodeURIComponent(String(searchParams.get('q')))));

  // const { data } = useQuery({
  //   queryKey: LibKeys.libDetail(String(searchParams.get('libCode'))),
  //   queryFn: () => getLibraryDetail({ libCode: String(searchParams.get('libCode')) }),
  //   enabled: !!searchParams.get('libCode'),
  // });
  // console.log(data);

  useEffect(() => {
    const queryString = searchParams.get('q');
    if (queryString) {
      setLib(JSON.parse(decodeURIComponent(queryString)));
    }
  }, [searchParams]);

  if (!lib)
    return (
      <div>
        <p>상세 정보가 없습니다.</p>
      </div>
    );
  return (
    <div className={styles.detail}>
      <div className={styles.text}>
        <p>
          <strong>{lib.libName}</strong>
        </p>
        <p>운영시간: {lib.operatingTime}</p>
        <p>주소: {lib.address}</p>
      </div>
      <Map lat={lib.latitude} lng={lib.longitude} width={'320px'} height={'320px'} />
    </div>
  );
};

export default LibraryDetail;
