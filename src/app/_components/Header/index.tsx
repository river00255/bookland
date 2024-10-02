import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <h1>
          <Link href="/">Bookland</Link>
        </h1>
      </nav>
    </header>
  );
};

export default Header;
