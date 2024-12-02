'use client';
import { useCallback, useRef } from 'react';
import styles from './slider.module.scss';
import Image from 'next/image';

const getVisibelEdgeItems = (
  list: HTMLUListElement,
  items: HTMLLIElement[] | null[]
) => {
  const { left: listLeft, right: listRight } = list.getBoundingClientRect();
  const isVisible = (item: HTMLLIElement | null) => {
    if (item) {
      const { left, right } = item?.getBoundingClientRect();
      return left <= listRight && right >= listLeft;
    }
    return false;
  };
  const leftIndex = Math.max(items.findIndex(isVisible), 0);
  const rightIndex = Math.min(items.findLastIndex(isVisible), items.length - 1);
  return { left: items[leftIndex], right: items[rightIndex] };
};

const Slider = ({ list }: { list: string[] }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement[] | null[]>([]);
  // console.log(list);

  const move = useCallback((direction: 'prev' | 'next') => {
    if (!listRef.current || !itemRef.current) return;
    const { left, right } = getVisibelEdgeItems(
      listRef.current,
      itemRef.current
    );
    const element = direction === 'prev' ? left : right;
    element?.scrollIntoView({
      inline: direction === 'prev' ? 'end' : 'start',
      block: 'nearest',
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={styles.container}>
      <ul ref={listRef}>
        {list.map((item, i) => (
          <li
            key={i}
            ref={(el) => {
              itemRef.current[i] = el;
            }}>
            <div>
              <Image
                src={item}
                alt={item}
                width={480}
                height={480}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => move('prev')}
        className={`${styles.nav} ${styles.prev}`}>
        &lt;
      </button>
      <button
        onClick={() => move('next')}
        className={`${styles.nav} ${styles.next}`}>
        &gt;
      </button>
    </div>
  );
};

export default Slider;
