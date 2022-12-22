import { Button } from '../../../components/Global/Button/Button';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { useProductList } from './useProductList';
import { Wrapper } from '../../../components/Global/Form/Form.styled';
import {
  ButtonsWrapper,
  DataWrapper,
  Img,
  ProductTitle,
  Section,
  Text,
} from './ProductList.styled';

export const ProductList = () => {
  const { handleChange, handleDelete, handleEdit, products } = useProductList();

  return (
    <Wrapper>
      {products?.map((item) => (
        <Section key={item.id}>
          <Img src={item.image} alt={item.title} />

          <DataWrapper>
            <ProductTitle>{item.title}</ProductTitle>
            <Text>Description: {item.description}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </DataWrapper>

          <ButtonsWrapper>
            <CheckboxInput
              defaultChecked={item.active}
              label={'Active'}
              onClick={() => handleChange(item)}
            />
            <Button onClick={() => handleEdit(item)} type={'button'}>
              Edit
            </Button>
            <Button onClick={() => handleDelete(item)} type={'button'}>
              Delete
            </Button>
          </ButtonsWrapper>
        </Section>
      ))}
    </Wrapper>
  );
};
