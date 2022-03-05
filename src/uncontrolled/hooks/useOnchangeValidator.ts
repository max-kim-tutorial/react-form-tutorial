import { useState, ChangeEvent } from 'react';
import { Validator, ErrorState } from './types';
import isequal from 'lodash.isequal';

type UseOnchangeValidatorOptions = {
  validators: Validator[];
};

const useOnchangeValidator = ({ validators }: UseOnchangeValidatorOptions) => {
  const [error, setError] = useState<ErrorState>({
    isError: false,
    errorMessages: [],
  });

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const errorMessages = validators
      .filter((validator) => !validator.validate(e.target.value))
      .map((validator) => ({
        id: validator.id,
        errorMessage: validator.errorMessage,
      }));

    if (
      errorMessages.length > 0 &&
      !isequal(errorMessages, error.errorMessages)
    ) {
      setError({
        isError: true,
        errorMessages,
      });
    }

    if (errorMessages.length === 0 && error.isError) {
      setError({
        isError: false,
        errorMessages: [],
      });
    }
  };

  return [handler, error] as const;
};

export default useOnchangeValidator;
