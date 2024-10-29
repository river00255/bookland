'use client';
import Link from 'next/link';
import styles from './account.module.scss';
import { signOut, useSession } from 'next-auth/react';

const Account = () => {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <ul className={styles.account}>
      <li>
        {session ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <Link href={'../login'}>
            <button>로그인 / 가입</button>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default Account;
