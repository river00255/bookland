import { getFavoriteLibList } from '@/app/_service/bookmark';
import { BookmarkKeys, LibKeys } from '@/app/_service/keys';
import { getLoanStatus } from '@/app/_service/library';
import { useQuery } from '@tanstack/react-query';
import styles from './favoriteLib.module.scss';
import { FavoriteLib } from '@/app/type';

const isLoanAvailable = (result: {
  hasBook: 'Y' | 'N';
  loanAvailable: 'Y' | 'N';
}) => {
  if (result.hasBook === 'N')
    return (
      <p style={{ color: '#94a3b8', fontSize: '13px' }}>소장 도서가 아닙니다</p>
    );
  return result.loanAvailable === 'N' ? (
    <p style={{ color: '#94a3b8' }}>대출 중</p>
  ) : (
    <p style={{ color: '#22c55e' }}>대출 가능</p>
  );
};

const LibItem = ({ item, isbn }: { item: FavoriteLib; isbn: string }) => {
  const { data: loan } = useQuery({
    queryKey: LibKeys.loan(item.code, isbn),
    queryFn: () => getLoanStatus({ libCode: item.code, isbn }),
  });
  // console.log(loan);

  return (
    <div className={styles.lib}>
      <p>{item.name}</p>
      {loan && isLoanAvailable(loan.result)}
    </div>
  );
};

const FavoriteLibrary = ({ email, isbn }: { email: string; isbn: string }) => {
  const { data: libs } = useQuery({
    queryKey: BookmarkKeys.libList(email),
    queryFn: () => getFavoriteLibList(email),
  });
  // console.log(libs);

  return (
    <div className={styles.list}>
      {libs?.length < 1 ? (
        <div>즐겨 찾는 도서관이 없습니다.</div>
      ) : (
        libs?.map((item: FavoriteLib) => (
          <LibItem item={item} isbn={isbn} key={item.code} />
        ))
      )}
    </div>
  );
};

export default FavoriteLibrary;
