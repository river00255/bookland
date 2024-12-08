import Link from 'next/link';
import styles from './header.module.scss';
import Account from '../Account';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <h1>
            <Link href="/">Bookland</Link>
          </h1>
          <Navigation />
        </div>
        <Account />
      </nav>
    </header>
  );
};

export default Header;
