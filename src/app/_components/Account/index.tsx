'use client';
import Link from 'next/link';
import styles from './account.module.scss';
import { signOut, useSession } from 'next-auth/react';

const Account = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;
  return (
    <ul className={styles.account}>
      {session ? (
        <>
          <li>
            <Link href={'../mypage'}>마이페이지</Link>
          </li>
          <li>
            <button
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}>
              로그아웃
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link href={'../login'}>
            <button>로그인 / 가입</button>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Account;
