import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAddProductMutation } from '../../../generated/types';
import * as yup from 'yup';
import { FormWrapper, Title } from './ProductForm.styled';
import { Form } from '../../../components/Global/Form/Form';
import { TextInput } from '../../../components/Global/inputs/TextInput/TextInput';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { Button } from '../../../components/Global/Button/Button';
import { useMutation } from '@apollo/client';
import { SET_NEW_PRODUCT } from '../../../client/client';

export const ProductForm = () => {
  const [addProduct, { loading }] = useAddProductMutation();
  const [setNewProduct] = useMutation(SET_NEW_PRODUCT);

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<ProductSchema>({
    mode: 'onChange',
    resolver: yupResolver(productValidation),
    defaultValues: {
      description: 'Default description',
      title: 'Default title' + Math.random().toString().slice(-4),
      price: +Math.random().toString().slice(-4),
      quantity: +Math.random().toString().slice(-4),
      active: true,
    },
  });

  const onSubmit = handleSubmit((input) => {
    addProduct({
      variables: {
        input: {
          ...input,
          active: true,
          image: `https://picsum.photos/id/${Math.random()
            .toString()
            .slice(-3)}/200/200`,
        },
      },
      onCompleted: (data) => {
        // console.log('res', data);

        setNewProduct({
          variables: {
            product: data.addProduct,
          },
          onCompleted: (res) => console.log('res', res),
          onError: (err) => console.log('err', { err }),
        });
      },
      onError: (error) => console.log('error', { error }),
    });
  });

  return (
    <FormWrapper>
      <Form onReset={() => reset()} onSubmit={onSubmit}>
        <Title>Add Product</Title>
        <TextInput
          {...register('title')}
          error={errors?.title?.message}
          label={'Title'}
          placeholder={'Product title'}
        />
        <TextInput
          {...register('description')}
          error={errors?.description?.message}
          label={'Description'}
          placeholder={'Product description'}
        />
        <TextInput
          {...register('price')}
          error={errors?.price?.message}
          label={'Price'}
          type={'number'}
        />
        <TextInput
          {...register('quantity')}
          error={errors?.quantity?.message}
          label={'Quantity'}
          type={'number'}
        />
        <CheckboxInput
          {...register('active')}
          error={errors?.active?.message}
          label={'Active'}
        />
        <Form.ButtonsWrapper>
          <Button loading={loading} type={'reset'}>
            Reset
          </Button>
          <Button
            disabled={!isValid && !isDirty}
            loading={loading}
            type={'submit'}
          >
            Add product
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </FormWrapper>
  );
};
export const productValidation = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(128, 'Title cannot exceed 128 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Description cannot exceed 128 characters'),
  price: yup
    .number()
    .required('Price is required')
    .max(1_000_000, 'Max 1 000 000'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .max(1_000_000, 'Max 1 000 000'),
  active: yup.boolean(),
});

export type ProductSchema = yup.InferType<typeof productValidation>;
