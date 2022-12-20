import { Button } from '../../components/Global/Button/Button';
import { Container, Title } from './Auth.styled';
import { Form } from '../../components/Global/Form/Form';
import { paths } from '../../routes/paths';
import { TextInput } from '../../components/Global/inputs/TextInput/TextInput';
import { toastNotify } from '../../utils/toast/toastNotify';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRegisterMutation } from '../../generated/graphql';

export const Register = () => {
  const navigate = useNavigate();

  const [signUp, { loading }] = useRegisterMutation();

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<RegisterSchema>({
    mode: 'onChange',
    resolver: yupResolver(registerValidation),
    defaultValues: {
      email: 'your.email@gmail.com',
      password: 'StrongPassword1!',
      confirmPassword: 'StrongPassword1!',
      username: 'FirstUser',
    },
  });

  const onSubmit = handleSubmit((registerInput) => {
    console.log('registerInput', registerInput);

    signUp({
      variables: { registerInput },
      onCompleted: (data) => navigate(paths.profile),
      onError: (error) => console.log('error', { error }),
    });
  });

  // if (data?.register.) return <Navigate to={paths.profile} />;

  return (
    <Container>
      <Form onReset={() => reset()} onSubmit={onSubmit}>
        <Title>Register</Title>
        <TextInput
          {...register('username')}
          error={errors?.username?.message}
          label={'Username'}
          placeholder={'your.email@gmail.com'}
        />
        <TextInput
          {...register('email')}
          error={errors?.email?.message}
          label={'Email'}
          placeholder={'your.email@gmail.com'}
          type={'email'}
        />
        <TextInput
          {...register('password')}
          error={errors?.password?.message}
          label={'Password'}
          placeholder={'StrongPassword1!'}
          type={'password'}
        />
        <TextInput
          {...register('confirmPassword')}
          error={errors?.confirmPassword?.message}
          label={'Repeat password'}
          placeholder={'StrongPassword1!'}
          type={'password'}
        />
        <Form.ButtonsWrapper>
          <Button isLoading={loading} type={'reset'}>
            Reset
          </Button>
          <Button
            isLoading={loading}
            disabled={!isValid && !isDirty}
            type={'submit'}
          >
            Register
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </Container>
  );
};

export const registerValidation = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .trim('Username cannot contain leading and trailing spaces')
    .strict(true)
    .min(3, 'Username must be at least 3 characters long')
    .max(40, 'Username cannot exceed 40 characters'),
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
  confirmPassword: yup
    .string()
    .required('Repeat password is required')
    .oneOf([yup.ref('password'), null], "Passwords don't match."),
});

export type RegisterSchema = yup.InferType<typeof registerValidation>;
