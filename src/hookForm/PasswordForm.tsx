import Input from '../fundamentals/Input';
import { useFormContext } from 'react-hook-form';

function PasswordForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset>
      <h3>비밀번호</h3>
      <label htmlFor="password">비밀번호</label>
      <Input {...register('password', { required: true })} id="password" />
      <label htmlFor="passwordConfirm">비밀번호 확인</label>
      <Input
        {...register('passwordConfirm', {
          required: '값을 입력해주세요',
          validate: (value) =>
            value === getValues('password') || '비밀번호가 일치하지 않아여',
        })}
        id="passwordConfirm"
      />
      {errors.passwordConfirm && (
        <div>
          <p>{errors.passwordConfirm.message}</p>
        </div>
      )}
    </fieldset>
  );
}

export default PasswordForm;
