import Bestseller from './_components/Bestseller';
import TrendLists from './_components/TrendLists';
import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={`container ${styles.main}`}>
      <TrendLists />
      <Bestseller />
    </div>
  );
}
