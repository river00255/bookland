'use client';
import Map from '@/app/_components/Map';
import { LibKeys } from '@/app/_service/keys';
import { getLibraryDetail } from '@/app/_service/library';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import styles from './libDetail.module.scss';
import Link from 'next/link';

const LibraryDetail = () => {
  const { code } = useParams();

  const { data } = useQuery({
    queryKey: LibKeys.libDetail(code.toString()),
    queryFn: () => getLibraryDetail({ libCode: code.toString() }),
  });

  const lib = data?.libs[0]?.lib?.libInfo;
  // console.log(lib);

  if (!data) return <div className={styles.detail}></div>;
  return (
    <div className={styles.detail}>
      <div className={styles.text}>
        <h4>{lib.libName}</h4>
        <p>운영시간 : {lib.operatingTime}</p>
        <p>주 소 : {lib.address}</p>
        <p>휴관일 : {lib.closed}</p>
        <Link href={lib.homepage}>
          <p>{lib.homepage}</p>
        </Link>
      </div>
      <div className={styles.location}>
        <Map
          lat={lib.latitude}
          lng={lib.longitude}
          width={'100%'}
          height={'320px'}
        />
      </div>
    </div>
  );
};

export default LibraryDetail;
