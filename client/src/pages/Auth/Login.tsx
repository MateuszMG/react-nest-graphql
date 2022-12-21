import { Button } from '../../components/Global/Button/Button';
import { Container, Title } from './Auth.styled';
import { Form } from '../../components/Global/Form/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { TextInput } from '../../components/Global/inputs/TextInput/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../generated/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [signIn, { loading }] = useLoginMutation();

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginSchema>({
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: 'your.email@gmail.com',
      password: 'StrongPassword1!',
    },
  });

  const onSubmit = handleSubmit((loginInput) => {
    signIn({
      variables: { loginInput },
      onCompleted: (data) => {
        setUser(data.login.accessToken);
        navigate(paths.profile);
      },
      onError: (error) => console.log('error', { error }),
    });
  });

  if (user.id) return <Navigate to={paths.profile} />;

  return (
    <Container>
      <Form onReset={() => reset()} onSubmit={onSubmit}>
        <Title data-testid={'text_title'}>Login</Title>
        <TextInput
          {...register('email')}
          data-testid={'input_email'}
          error={errors?.email?.message}
          label={'Email'}
          placeholder={'your.email@gmail.com'}
          type={'email'}
        />
        <TextInput
          {...register('password')}
          data-testid={'input_password'}
          error={errors?.password?.message}
          label={'Password'}
          placeholder={'StrongPassword1!'}
          type={'password'}
        />
        <Form.ButtonsWrapper>
          <Button data-testid={'button_reset'} loading={loading} type={'reset'}>
            Reset
          </Button>
          <Button
            data-testid={'button_submit'}
            disabled={!isValid && !isDirty}
            loading={loading}
            type={'submit'}
          >
            Login
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </Container>
  );
};

export const loginValidation = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .lowercase('Only lowercase letters')
    .max(128, 'Email cannot exceed 128 characters')
    .email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .trim('Password cannot contain leading and trailing spaces')
    .strict(true)
    .min(6, 'Password must be at least 6 characters long')
    .max(72, 'Password cannot exceed 72 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/,
      'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ? ',
    ),
});

export type LoginSchema = yup.InferType<typeof loginValidation>;
