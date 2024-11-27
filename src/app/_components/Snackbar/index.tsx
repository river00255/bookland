import { useEffect } from 'react';
import style from './snackbar.module.scss';

const Snackbar = ({
  message,
  show,
  close,
  time = 3000,
}: {
  message: string;
  show: (message: string) => void;
  close: () => void;
  time: number;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => close(), time);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <div className={style.snackbar}>
      <p>{message}</p>
      <button onClick={() => close()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#5f6368">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </div>
  );
};

export default Snackbar;
