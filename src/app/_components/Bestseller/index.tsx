'use client';
import { getBestseller } from '@/app/_service/bookstore';
import { StoreKeys } from '@/app/_service/keys';
import { useQuery } from '@tanstack/react-query';

const Bestseller = () => {
  const { data } = useQuery({
    queryKey: StoreKeys.best,
    queryFn: () => getBestseller(),
  });
  console.log(data);

  return (
    <div>
      <div>
        <h3>베스트셀러</h3>
      </div>
    </div>
  );
};

export default Bestseller;
