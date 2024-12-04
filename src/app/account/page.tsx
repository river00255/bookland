'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './register.module.scss';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendEmail } from '../_service/auth';
import { useSnackbar } from '../_components/SnackbarProvider';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  username: z.string().regex(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/, {
    message: '2~20자 이내로 입력하세요.',
  }),
});

type Inputs = {
  email: string;
  username: string;
};

const Register = () => {
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
    const response = await sendEmail({
      email: data.email,
      username: data.username,
    });
    if (response) {
      setLoading(false);
      show(response.message);
    }
  };

  return (
    <div className="container">
      <div className={styles.register}>
        <h4>회원가입</h4>
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
          <label>이 름</label>
          <input
            type="text"
            {...register('username')}
            placeholder="이름을 입력해주세요."
          />
          {errors.username?.message && (
            <span className={styles.errorMessage}>
              {errors.username?.message}
            </span>
          )}
          <button disabled={loading}>가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
