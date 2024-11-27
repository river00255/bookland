'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './verify.module.scss';
import { useEffect, useState } from 'react';
import { verifyEmail } from '@/app/_service/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

type Inputs = {
  email: string;
};

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{ [key: string]: string }>({});

  const verify = async (token: string) => {
    const response = await verifyEmail(token);
    if (response) {
      setResult(response);
      setLoading(false);
    }
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn('credentials', {
      email: data.email,
      callbackUrl: 'http://localhost:3000',
    });
  };

  useEffect(() => {
    if (token) verify(token);
  }, [token]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className={styles.verify}>
      {result.message && (
        <>
          <h4>확인되지 않은 이메일</h4>
          <button onClick={() => router.replace('../login')}>
            이메일로 링크 다시 보내기
          </button>
          <span className={styles.errorMessage}>{result.message}</span>
        </>
      )}
      {result.email && (
        <>
          <h4>이메일 확인 완료</h4>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>이메일</label>
            <input
              type="text"
              value={result.email}
              {...register('email')}
              readOnly
            />
            <button>클릭해서 로그인</button>
          </form>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
