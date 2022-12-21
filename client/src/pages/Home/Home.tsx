import { useGetProductsQuery } from '../../generated/types';

interface HomeProps {}

export const Home = ({}: HomeProps) => {
  const { data } = useGetProductsQuery();
  console.log('useGetProductsQuery', data);

  return (
    <div>
      <p> Home </p>
      <p> Home </p>
      <p> Home </p>
    </div>
  );
};
