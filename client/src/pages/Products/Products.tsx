import { ProductForm } from './ProductForm/ProductForm';
import { ProductList } from './ProductList/ProductList';
import { Container } from './Products.styled';

export const Products = () => {
  return (
    <Container>
      <ProductForm />
      <ProductList />
    </Container>
  );
};
