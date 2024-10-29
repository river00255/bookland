'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.scss';
import { signIn } from 'next-auth/react';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={styles.login}>
      <h4>이메일로 로그인</h4>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          type="text"
          {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          placeholder="이메일을 입력해주세요."
        />
        <label>비밀번호</label>
        <input
          type="password"
          {...register('password', {
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,18}$/,
          })}
          placeholder="비밀번호를 입력해주세요."
        />
        <button>로그인</button>
      </form>
      <div>
        <button
          onClick={() =>
            signIn('google', { callbackUrl: 'http://localhost:3000' })
          }>
          Google로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
