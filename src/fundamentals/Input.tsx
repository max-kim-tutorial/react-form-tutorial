import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type InputStyleAttributes = {
  width?: number;
};

type InputProps = InputStyleAttributes & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => (
  <StyledInput {...props} ref={ref} />
));

const StyledInput = styled.input<InputStyleAttributes>`
  color: black
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : '100%')};
  padding: 1rem 0.5rem;
  background-color: black
  &:disabled {
    background-color: white
  }
`;

Input.displayName = 'Input';

export default Input;
