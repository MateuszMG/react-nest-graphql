import {
  useGetHighlightedProductQuery,
  useHighlightedProductUpdatedSubscription,
} from '../../../generated/types';
import {
  DataWrapper,
  Img,
  ProductTitle,
  Section,
  SectionTitle,
  Text,
  Wrapper,
} from './HighlightedProduct.styled';

export const HighlightedProduct = () => {
  const { data } = useGetHighlightedProductQuery();
  const product = data?.getHighlightedProduct;

  const { data: updatedData } = useHighlightedProductUpdatedSubscription();
  const updatedProduct = updatedData?.highlightedProductUpdated;

  if (!product || !updatedProduct) return null;

  const productToShow = updatedProduct || product;

  return (
    <Wrapper>
      <SectionTitle>Highlighted product</SectionTitle>
      <Section>
        <Img src={productToShow.image} alt={productToShow.title} />

        <DataWrapper>
          <ProductTitle>{productToShow.title}</ProductTitle>
          <Text>Description: {productToShow.description}</Text>
          <Text>Price: {productToShow.price}</Text>
          <Text>Quantity: {productToShow.quantity}</Text>
        </DataWrapper>
      </Section>
    </Wrapper>
  );
};
