import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader } from '../Loader/Loader';
import { ButtonTag } from './Button.styled';

interface GlobalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  error?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  disabled,
  error,
  loading,
  ...rest
}: GlobalButtonProps) => {
  return (
    <ButtonTag {...rest} disabled={disabled || loading || error}>
      {loading ? <Loader /> : children}
    </ButtonTag>
  );
};
