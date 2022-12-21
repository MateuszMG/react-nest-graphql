import { forwardRef, InputHTMLAttributes } from 'react';
import { InputBox } from '../../InputBox/InputBox';
import { Input } from './TextInput.styled';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...rest }: TextInputProps, ref) => {
    return (
      <InputBox label={label} error={error}>
        <Input {...rest} ref={ref} />
      </InputBox>
    );
  },
);
