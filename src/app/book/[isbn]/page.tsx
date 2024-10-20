'use client';
import { getBookDetail } from '@/app/_service/bookstore';
import { StoreKeys } from '@/app/_service/keys';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import BookDetail from '@/app/_components/BookDetail';

const Book = () => {
  const params = useParams();
  // console.log(params);

  const { data } = useQuery({
    queryKey: StoreKeys.bookDetail(String(params.isbn)),
    queryFn: () => getBookDetail({ isbn: String(params.isbn) }),
    enabled: !!params.isbn,
  });
  // console.log(data);

  return (
    <div className="container">
      {data && <BookDetail item={data.item[0]} />}
    </div>
  );
};

export default Book;
