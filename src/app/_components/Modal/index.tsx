'use client';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

const Modal = ({
  children,
  isOpen,
  close,
  reset,
}: {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
  reset?: () => void;
}) => {
  return isOpen
    ? createPortal(
        <div
          onClick={() => {
            close();
            if (reset) reset();
          }}
          className={styles.modal}>
          <div onClick={(e) => e.stopPropagation()} className={styles.inner}>
            {children}
          </div>
        </div>,
        document.querySelector('#modalRoot')!
      )
    : null;
};

export default Modal;
