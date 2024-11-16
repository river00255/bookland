'use client';
import { SyntheticEvent, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import styles from './reviewForm.module.scss';
import dynamic from 'next/dynamic';
import { addReview, deleteReview, updateReview } from '@/app/_service/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookReview } from '@/app/type';
import { ReviewKeys } from '@/app/_service/keys';
import { useRouter } from 'next/navigation';

const TinymceEditor = dynamic(() => import('../TinymceEditor'), {
  ssr: false,
});

const ReviewForm = ({
  userId,
  item,
}: {
  userId: string;
  item:
    | Pick<BookReview, 'title' | 'author' | 'isbn' | 'publisher'>
    | BookReview;
}) => {
  // const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const router = useRouter();

  const isExistField = (
    field: keyof BookReview,
    item:
      | Pick<BookReview, 'title' | 'author' | 'isbn' | 'publisher'>
      | BookReview
  ) => {
    return field in item;
  };

  const queryClient = useQueryClient();

  const { mutate: write } = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReviewKeys.all,
      });
      router.push('../review');
    },
  });

  const { mutate: edit } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReviewKeys.all,
      });
      router.push(`../review/${(item as BookReview).id}`);
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReviewKeys.all,
      });
      router.push('../review');
    },
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // const title = inputRef.current[0]?.value;
    // const author = inputRef.current[1]?.value;
    if (!item.isbn || !editorRef.current) return;
    const content = editorRef.current.getContent();

    if (isExistField('createdAt', item)) {
      console.log('update');
      if (userId !== (item as BookReview).userId) return;
      return edit({
        ...(item as BookReview),
        review: content,
        public: isPublic,
        updatedAt: new Date(),
      });
    }
    return write({
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
      <TinymceEditor
        editorRef={editorRef}
        initialValue={
          isExistField('review', item) ? (item as BookReview).review : ''
        }
      />
      <div className={styles.buttons}>
        <label htmlFor="public">비밀글</label>
        <input
          type="checkbox"
          id="public"
          defaultChecked={
            isExistField('public', item) && !(item as BookReview).public
          }
          onChange={(e) => setIsPublic(!e.target.checked)}
        />
      </div>
      <div className={styles.buttons}>
        {isExistField('createdAt', item) && (item as BookReview).createdAt ? (
          <>
            <button>수정하기</button>
            <button
              type="button"
              onClick={() => {
                if (confirm('삭제하시겠습니까?'))
                  onDelete({ id: (item as BookReview).id, userId });
              }}>
              삭제하기
            </button>
          </>
        ) : (
          <button>글쓰기</button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
