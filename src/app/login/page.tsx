'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.scss';
import { signIn } from 'next-auth/react';
import { sendMagicLink } from '../_service/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = {
  email: string;
};

const schema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    sendMagicLink(data.email);
  };

  return (
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
        <button>로그인</button>
      </form>
      <div className={styles.buttons}>
        <button
          onClick={() =>
            signIn('google', { callbackUrl: 'http://localhost:3000' })
          }>
          Google로 로그인
        </button>
        <button
          onClick={() =>
            signIn('kakao', {
              callbackUrl: 'http://localhost:3000',
              redirect: true,
            })
          }>
          Kakao로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
