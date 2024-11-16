import { reviewQueries } from '@/app/_service/review';
import { useQuery } from '@tanstack/react-query';

const ReviewByBook = ({ isbn }: { isbn: string }) => {
  const { data } = useQuery(reviewQueries.byBook({ isbn }));
  console.log(data);

  return <div></div>;
};

export default ReviewByBook;
