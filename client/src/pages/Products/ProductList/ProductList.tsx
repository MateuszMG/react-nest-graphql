import { Button } from '../../../components/Global/Button/Button';
import { Wrapper } from '../../../components/Global/Form/Form.styled';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../../generated/types';
import {
  ButtonsWrapper,
  DataWrapper,
  Header,
  Img,
  ProductTitle,
  Section,
  Text,
} from './ProductList.styled';

export const ProductList = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const { data } = useGetProductsQuery();
  const products = data?.getProducts;
  // console.log('pp', products && products[0]);

  return (
    <Wrapper>
      <Header>
        <Button>Change active</Button>
      </Header>
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
            <CheckboxInput label={'Active'} defaultChecked={item.active} />
            <Button>Edit</Button>
            <Button
              onClick={() =>
                deleteProduct({
                  variables: { input: { id: item.id } },
                  onError: (err) => console.log('err', { err }),
                })
              }
            >
              Delete
            </Button>
          </ButtonsWrapper>
        </Section>
      ))}
    </Wrapper>
  );
};
