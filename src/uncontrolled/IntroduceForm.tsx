import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import Input from '../fundamentals/Input';

const IntroduceForm = forwardRef(
  (_, ref: Ref<{ values: { introduce: string[] } }>) => {
    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);

    // 만약에 이 상황에서 submit시 수동으로 에러를 발생시키고 싶다면,
    // error 상태를 하나 더 만들어서 그 함수도 위로 올려보내줘야할듯?
    useImperativeHandle(
      ref,
      () => ({
        get values() {
          return {
            introduce: checkboxRefs.current
              .filter((elem) => elem?.checked)
              .map((elem) => elem?.value) as string[],
          };
        },
      }),
      [],
    );

    return (
      <fieldset>
        <h3>나는 어떤 사람?(다중선택)</h3>
        <label htmlFor="cool">멋진 사람</label>
        <Input
          id="cool"
          type="checkbox"
          name="introduce"
          value="cool"
          defaultChecked={true}
          ref={(el) => (checkboxRefs.current[0] = el)}
        />
        <label htmlFor="enthusiastic">열심히 하는 사람</label>
        <Input
          id="enthusiastic"
          type="checkbox"
          name="introduce"
          value="enthusiastic"
          ref={(el) => (checkboxRefs.current[1] = el)}
        />
        <label htmlFor="fun">재미있는 사람</label>
        <Input
          id="fun"
          type="checkbox"
          name="introduce"
          value="fun"
          ref={(el) => (checkboxRefs.current[2] = el)}
        />
      </fieldset>
    );
  },
);

IntroduceForm.displayName = 'IntroduceForm';

export default IntroduceForm;
