import styles from './skeleton.module.scss';

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.item}>
        <div></div>
        <span></span>
      </div>
      <div className={styles.item}>
        <div></div>
        <span></span>
      </div>
      <div className={styles.item}>
        <div></div>
        <span></span>
      </div>
    </div>
  );
};

export default Skeleton;
