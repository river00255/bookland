'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.scss';
import { signIn } from 'next-auth/react';
import { sendMagicLink } from '../_service/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from '../_components/SnackbarProvider';
import Link from 'next/link';
import { useState } from 'react';

type Inputs = {
  email: string;
};

const schema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const { show } = useSnackbar();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const response = await sendMagicLink(data.email);
    if (response) {
      setLoading(false);
      show(response.message);
    }
  };

  return (
    <div className="container">
      <div className={styles.login}>
        <h4>이메일로 로그인</h4>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label>이메일</label>
          <input
            type="text"
            {...register('email')}
            placeholder="이메일을 입력해주세요."
          />
          {errors.email?.message && (
            <span className={styles.errorMessage}>{errors.email?.message}</span>
          )}
          <button disabled={loading}>로그인</button>
        </form>
        <div className={styles.buttons}>
          <button
            onClick={() =>
              signIn('google', {
                callbackUrl: process.env
                  .NEXT_PUBLIC_AUTH_CALLBACK_URL as string,
              })
            }>
            Google로 로그인
          </button>
          <button
            onClick={() =>
              signIn('kakao', {
                callbackUrl: process.env
                  .NEXT_PUBLIC_AUTH_CALLBACK_URL as string,
                redirect: true,
              })
            }>
            Kakao로 로그인
          </button>
        </div>
        <Link href={'../account'} className={styles.register}>
          <p>회원가입 👋</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
