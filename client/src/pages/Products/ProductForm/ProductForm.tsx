import { Button } from '../../../components/Global/Button/Button';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { Form } from '../../../components/Global/Form/Form';
import { FormWrapper, Title } from './ProductForm.styled';
import { TextInput } from '../../../components/Global/inputs/TextInput/TextInput';
import { useProductForm } from './useProductForm';

export const ProductForm = () => {
  const { errors, isDirty, isValid, loading, onSubmit, register, reset } =
    useProductForm();

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
