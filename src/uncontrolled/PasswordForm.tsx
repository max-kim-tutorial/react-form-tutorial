import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import Input from '../fundamentals/Input';
import { ErrorState } from './hooks/types';
import useOnchangeValidator from './hooks/useOnchangeValidator';

const PasswordForm = forwardRef(
  (
    _,
    ref: Ref<{
      values: { password: string; passwordConfirm: string };
      errors: {
        password: ErrorState | null;
        passwordConfirm: ErrorState | null;
      };
    }>,
  ) => {
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [handlePassword, passwordError] = useOnchangeValidator({
      validators: [
        {
          id: 'requiredPError',
          validate: (value) => !!value,
          errorMessage: '값을 입력해주세요',
        },
      ],
    });

    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const [handlePasswordConfirm, passwordConfirmError] = useOnchangeValidator({
      validators: [
        {
          id: 'requiredError',
          validate: (value) => !!value,
          errorMessage: '값을 입력해주세요',
        },
        {
          id: 'passwordError',
          validate: (value) => value === passwordRef.current?.value,
          errorMessage: '비밀번호가 일치하지 않아요',
        },
      ],
    });

    useImperativeHandle(
      ref,
      () => ({
        get values() {
          return {
            password: passwordRef.current?.value as string,
            passwordConfirm: passwordConfirmRef.current?.value as string,
          };
        },
        get errors() {
          return {
            password: passwordError,
            passwordConfirm: passwordConfirmError,
          };
        },
      }),
      [],
    );

    return (
      <fieldset>
        <h3>비밀번호</h3>
        <label htmlFor="password">비밀번호</label>
        <Input
          ref={passwordRef}
          id="password"
          defaultValue="default value 설정"
          name="pw"
          onChange={handlePassword}
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <Input
          ref={passwordConfirmRef}
          id="passwordConfirm"
          name="pw"
          onChange={handlePasswordConfirm}
        />
        {passwordConfirmError.isError && (
          <div>
            {passwordConfirmError.errorMessages.map((error) => (
              <p key={error.id}>{error.errorMessage}</p>
            ))}
          </div>
        )}
      </fieldset>
    );
  },
);

PasswordForm.displayName = 'PasswordForm';

export default PasswordForm;
