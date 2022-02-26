import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';

const BloodTypeForm = forwardRef(
  (_, ref: Ref<{ values: { bloodType: string } }>) => {
    const bloodTypeRef = useRef<HTMLSelectElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        get values() {
          return {
            bloodType: bloodTypeRef.current?.value as string,
          };
        },
      }),
      [],
    );

    return (
      <fieldset>
        <h3>혈액형</h3>
        <label htmlFor="blood-type">혈액형</label>
        <select ref={bloodTypeRef} name="blood-type" id="blood-type">
          <option value="A" selected>
            A
          </option>
          <option value="AB">AB</option>
          <option value="B">B</option>
          <option value="O">O</option>
        </select>
      </fieldset>
    );
  },
);

BloodTypeForm.displayName = 'BloodTypeForm';

export default BloodTypeForm;
