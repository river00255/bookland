import LibraryLists from '../_components/LibraryLists';
import styles from './libs.module.scss';

const Library = () => {
  return (
    <div className={`container ${styles.main}`}>
      <LibraryLists />
    </div>
  );
};

export default Library;
