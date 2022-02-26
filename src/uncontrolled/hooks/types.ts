import { InputHTMLAttributes } from 'react';

export type InputValueAttr = InputHTMLAttributes<HTMLInputElement>['value'];

export type Validator = {
  id: string;
  validate: (value: InputValueAttr) => boolean;
  errorMessage: string;
};

export type ErrorState = {
  isError: boolean;
  errorMessages: Omit<Validator, 'validate'>[];
};
