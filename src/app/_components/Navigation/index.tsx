'use client';
import Link from 'next/link';
import styles from './nav.module.scss';
import { usePathname } from 'next/navigation';

const routes = [
  { id: 1, title: '도서검색', path: '/book/search' },
  { id: 2, title: '도서관목록', path: '/library' },
  { id: 3, title: '독자후기', path: '/review' },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.nav}>
      {routes.map((item) => (
        <li
          key={item.id}
          className={pathname === item.path ? `${styles.active}` : ''}>
          <Link href={item.path}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
