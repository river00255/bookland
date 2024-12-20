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
import { useSnackbar } from '../SnackbarProvider';

const TinymceEditor = dynamic(() => import('../TinymceEditor'), {
  ssr: false,
  loading: () => <div></div>,
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
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const router = useRouter();

  const { show } = useSnackbar();

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
      show('독서 후기가 작성되었습니다.');
      router.push('../review');
    },
  });

  const { mutate: edit } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReviewKeys.all,
      });
      show('독서 후기가 수정되었습니다.');
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
    if (!item.isbn || !editorRef.current) return;
    if (editorRef.current.getContent({ format: 'text' }).length < 1) {
      show('내용을 입력하세요.');
      return;
    }
    const content = editorRef.current.getContent();

    if (isExistField('createdAt', item)) {
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
