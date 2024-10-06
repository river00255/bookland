import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <h1>
          <Link href="/">Bookland</Link>
        </h1>
        <ul>
          <Link href={'/book/search'}>도서검색</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
