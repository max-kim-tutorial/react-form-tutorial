import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import Input from '../fundamentals/Input';

const NationalityForm = forwardRef(
  (_, ref: Ref<{ values: { nationality: string } }>) => {
    const radioRefs = useRef<(HTMLInputElement | null)[]>([]);

    useImperativeHandle(
      ref,
      () => ({
        get values() {
          return {
            nationality: radioRefs.current
              .filter((elem) => elem!.checked)
              .map((elem) => elem!.value)[0] as string,
          };
        },
      }),
      [],
    );

    return (
      <fieldset>
        <h3>나의 국적은?</h3>
        <label htmlFor="rok">대한민국</label>
        <Input
          id="rok"
          type="radio"
          name="nationality"
          value="rok"
          ref={(el) => (radioRefs.current[0] = el)}
        />
        <label htmlFor="usa">미국</label>
        <Input
          id="usa"
          type="radio"
          value="usa"
          name="nationality"
          ref={(el) => (radioRefs.current[1] = el)}
        />
      </fieldset>
    );
  },
);

NationalityForm.displayName = 'NationalityForm';

export default NationalityForm;
