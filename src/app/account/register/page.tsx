'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './register.module.scss';
import { useState } from 'react';
import { registerAccount } from '@/app/_service/auth';

const RegisterEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();

  const [result, setResult] = useState<{ [key: string]: string }>({});

  const register = async (token: string) => {
    const response = await registerAccount(token);
    setResult(response);
  };

  return (
    <div className={`container ${styles.register}`}>
      <h4>Welcome!</h4>
      <button onClick={() => register(token as string)}>
        클릭하고 회원가입 완료하기
      </button>
      {result.email && (
        <button onClick={() => router.replace('../login')}>
          로그인 화면으로 이동
        </button>
      )}
      {result.message && (
        <span className={styles.errorMessage}>{result.message}</span>
      )}
    </div>
  );
};

export default RegisterEmail;
