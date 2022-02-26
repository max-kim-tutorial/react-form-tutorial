import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import PasswordForm from './PasswordForm';
import IntroduceForm from './IntroduceForm';

function ReactHookForm() {
  const methods = useForm({ mode: 'all' });
  const onSubmit = (data: any) => console.log(data);
  console.log('렌더링');

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>React Hook Form</h2>
        <PasswordForm />
        <IntroduceForm />
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
}

export default ReactHookForm;
