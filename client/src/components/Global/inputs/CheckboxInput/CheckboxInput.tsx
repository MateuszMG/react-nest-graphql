import { forwardRef, InputHTMLAttributes } from 'react';
import { Error, Input, Label, Span, Wrap } from './CheckboxInput.styled';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, error, ...rest }: CheckboxInputProps, ref) => {
    return (
      <Wrap>
        <Label>
          {label}
          <Input {...rest} type={'checkbox'} ref={ref} />
          <Span />
        </Label>

        <Error>{error}</Error>
      </Wrap>
    );
  },
);
