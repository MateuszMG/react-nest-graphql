import { Button } from '../../../components/Global/Button/Button';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { Form } from '../../../components/Global/Form/Form';
import { FormWrapper } from './TodoForm.styled';
import { TextInput } from '../../../components/Global/inputs/TextInput/TextInput';
import { useTodoForm } from './useTodoForm';

export const TodoForm = () => {
  const { errors, isDirty, isValid, onSubmit, register, reset } = useTodoForm();

  return (
    <FormWrapper>
      <Form onReset={() => reset()} onSubmit={onSubmit}>
        <TextInput
          {...register('title')}
          error={errors?.title?.message}
          label={'Title'}
        />

        <TextInput
          {...register('description')}
          error={errors?.description?.message}
          label={'Description'}
        />

        <CheckboxInput
          {...register('done')}
          error={errors?.done?.message}
          label={'Done'}
        />

        <Form.ButtonsWrapper>
          <Button type={'reset'}>Reset</Button>
          <Button disabled={!isValid && !isDirty} type={'submit'}>
            Add todo
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </FormWrapper>
  );
};
