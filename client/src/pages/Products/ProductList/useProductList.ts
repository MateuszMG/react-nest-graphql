import { editedProductVar } from '../../../client/reactiveVariables';
import {
  Product,
  useChangeActiveProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../../generated/types';

export const useProductList = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const [changeActive] = useChangeActiveProductMutation();
  const { data, client } = useGetProductsQuery();
  const products = data?.getProducts;
  const { cache } = client;

  const handleChange = (item: Product) => {
    changeActive({
      variables: { input: { id: item.id } },
      onCompleted: () => {
        cache.modify({
          id: cache.identify(item),
          fields: {
            active(bool) {
              return !bool;
            },
          },
        });
      },
      onError: (err) => console.log('err', { err }),
    });
  };

  const handleEdit = (item: Product) => {
    editedProductVar(item);
  };

  const handleDelete = (item: Product) => {
    deleteProduct({
      variables: { input: { id: item.id } },
      onCompleted: () => {
        cache.evict({ id: cache.identify({ ...item }) });
        cache.gc();
      },
      onError: (err) => console.log('err', { err }),
    });
  };

  return { handleChange, handleDelete, handleEdit, products };
};
