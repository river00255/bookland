'use client';
import { SyntheticEvent, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import styles from './reviewForm.module.scss';
import dynamic from 'next/dynamic';
import { addReview } from '@/app/_service/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TinymceEditor = dynamic(() => import('../TinymceEditor'), {
  ssr: false,
});

const ReviewForm = ({
  userId,
  item,
  initialValue,
}: {
  userId: string;
  item: { title: string; author: string; isbn: string; publisher: string };
  initialValue?: string;
}) => {
  // const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const queryClient = useQueryClient();

  const { mutate: write } = useMutation({
    mutationFn: addReview,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({});
    // },
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // const title = inputRef.current[0]?.value;
    // const author = inputRef.current[1]?.value;
    if (!item.isbn || !editorRef.current) return;
    const content = editorRef.current.getContent();
    // console.log({ ...item, review: content, userId: userId, public: isPublic });
    write({
      ...item,
      review: content,
      userId: userId,
      public: isPublic,
    });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <span>
        <label htmlFor="title">책 제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={item.title || ''}
          readOnly
          // ref={(el) => {
          //   inputRef.current[0] = el;
          // }}
        />
      </span>
      <span>
        <label htmlFor="author">지은이</label>
        <input
          type="text"
          id="author"
          name="author"
          value={item.author || ''}
          readOnly
          // ref={(el) => {
          //   inputRef.current[1] = el;
          // }}
        />
      </span>
      <br />
      <TinymceEditor editorRef={editorRef} initialValue={initialValue} />
      <label htmlFor="public">비밀글</label>
      <input
        type="checkbox"
        id="public"
        onChange={(e) => setIsPublic(!e.target.checked)}
      />
      <button>Log editor content</button>
    </form>
  );
};

export default ReviewForm;
