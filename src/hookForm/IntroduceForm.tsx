import Input from '../fundamentals/Input';
import { useFormContext } from 'react-hook-form';

function IntroduceForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const introduceInputAttr = register('introduce', {
    required: '값을 입력해 주세요',
  });

  return (
    <fieldset>
      <h3>나는 어떤 사람?(다중선택)</h3>
      <label htmlFor="cool">멋진 사람</label>
      <Input id="cool2" type="checkbox" value="cool" {...introduceInputAttr} />
      <label htmlFor="enthusiastic">열심히 하는 사람</label>
      <Input
        id="enthusiastic2"
        type="checkbox"
        value="enthusiastic"
        {...introduceInputAttr}
      />
      <label htmlFor="fun">재미있는 사람</label>
      <Input id="fun2" type="checkbox" value="fun" {...introduceInputAttr} />
      {errors.introduce && (
        <div>
          <p>{errors.introduce.message}</p>
        </div>
      )}
    </fieldset>
  );
}

export default IntroduceForm;
