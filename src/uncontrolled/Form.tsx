import { useRef, FormEvent } from 'react';
import BloodTypeForm from './BloodTypeForm';
import IntroduceForm from './IntroduceForm';
import NationalityForm from './NationallityForm';
import PasswordForm from './PasswordForm';

function UncontrolledForm() {
  const passwordRef = useRef({
    values: { password: '', passwordConfirm: '' },
    errors: {
      password: { isError: false, errorMessages: [] },
      passwordConfirm: null,
    },
  });
  const introduceRef = useRef({ values: { introduce: [] } });
  const nationalityRef = useRef({ values: { nationality: '' } });
  const bloodTypeRef = useRef({ values: { bloodType: '' } });

  // 여기서 button을 조건에 따라 disable하고 싶은 경우라면..?
  // 음......확실히 이건 좀 곤란하겠다

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(bloodTypeRef.current);
    console.log(passwordRef.current.errors);
    console.log(nationalityRef.current.values);
    console.log(introduceRef.current.values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>직접 만들고 렌더링 영향을 최소화한 uncontrolled form</h2>
      <PasswordForm ref={passwordRef} />
      <IntroduceForm ref={introduceRef} />
      <NationalityForm ref={nationalityRef} />
      <BloodTypeForm ref={bloodTypeRef} />
      <button type="submit">submit</button>
    </form>
  );
}

export default UncontrolledForm;
