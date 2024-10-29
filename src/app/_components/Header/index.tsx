import Link from 'next/link';
import styles from './header.module.scss';
import Account from '../Account';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <h1>
            <Link href="/">Bookland</Link>
          </h1>
          <ul>
            <li>
              <Link href={'/book/search'}>도서검색</Link>
            </li>
            <li>
              <Link href={'/library'}>도서관목록</Link>
            </li>
          </ul>
        </div>
        <Account />
      </nav>
    </header>
  );
};

export default Header;
