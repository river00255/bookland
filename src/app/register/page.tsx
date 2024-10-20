'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './register.module.scss';

type Inputs = {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
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
    <div className={styles.register}>
      <h4>회원가입</h4>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          type="text"
          {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          placeholder="이메일을 입력해주세요."
        />
        {errors.email && <span className={styles.errorMessage}>올바른 이메일을 입력해주세요.</span>}
        <label>이 름</label>
        <input
          type="text"
          {...register('username', { pattern: /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/ })}
          placeholder="이름을 입력해주세요."
        />
        {errors.username && <span className={styles.errorMessage}>올바른 이름을 입력해주세요.</span>}
        <label>휴대폰 번호</label>
        <input
          type="text"
          {...register('phone', { pattern: /^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/ })}
          placeholder="(예)01012345678"
        />
        {errors.phone && <span className={styles.errorMessage}>올바른 휴대폰 번호를 입력해주세요.</span>}
        <label>비밀번호</label>
        <input
          type="password"
          {...register('password', { pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,18}$/ })}
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.password && <span className={styles.errorMessage}>올바르지 않은 비밀번호 입니다.</span>}
        <input
          type="password"
          {...register('confirmPassword', { pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,18}$/ })}
          placeholder="비밀번호를 다시 한번 입력해주세요."
        />
        {watch('confirmPassword')?.length > 0 && watch('password') !== watch('confirmPassword') && (
          <span className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</span>
        )}
        <p className={styles.message}>영문 대소문자, 숫자를 조합해 6자 이상 18자 이하로 입력해주세요.</p>
        <button>가입하기</button>
      </form>
    </div>
  );
};

export default Register;
