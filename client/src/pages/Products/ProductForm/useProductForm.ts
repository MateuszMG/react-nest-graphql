import { editedProductVar } from '../../../client/reactiveVariables';
import { productFormHelpers } from './productFormHelpers';
import { Reference, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  GetProductsDocument,
  useAddProductMutation,
  GetProductsQuery,
  ProductFragmentDoc,
  useEditProductMutation,
} from '../../../generated/types';

export const useProductForm = () => {
  const [editProduct] = useEditProductMutation();
  const [addProduct, { client, loading }] = useAddProductMutation();
  const { cache } = client;

  const editedProduct = useReactiveVar(editedProductVar);

  const { createImageSrc, createDefaultValues } = productFormHelpers();

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<ProductSchema>({
    mode: 'onChange',
    resolver: yupResolver(productValidation),
    defaultValues: createDefaultValues(),
  });

  const onSubmit = handleSubmit((input) => {
    if (editedProduct) {
      editProduct({
        variables: {
          input: {
            id: editedProduct.id,
            image: editedProduct.image,
            ...input,
          },
        },
        onCompleted: () => {
          cache.modify({
            id: cache.identify({ ...editedProduct }),
            fields: {
              title() {
                return input.title;
              },
              description() {
                return input.description;
              },
              active() {
                return input.active;
              },
              quantity() {
                return input.quantity;
              },
              price() {
                return input.price;
              },
            },
          });
        },
        onError: (error) => console.log('error', { error }),
      });

      editedProductVar(null);
    } else {
      addProduct({
        variables: { input: { ...input, image: createImageSrc() } },
        onCompleted: (data) => {
          const newProduct = data.addProduct;

          const products = cache.readQuery({
            query: GetProductsDocument,
          }) as GetProductsQuery;

          cache.modify({
            id: cache.identify({ __typename: 'Query', products }),
            fields: {
              getProducts(existingProductsRefs = [], { readField }) {
                const newProductsRef = cache.writeFragment({
                  data: newProduct,
                  fragment: ProductFragmentDoc,
                });

                const alreadyExists = existingProductsRefs.some(
                  (ref: Reference) => readField('id', ref) === newProduct.id,
                );

                if (alreadyExists) return existingProductsRefs;
                return [...existingProductsRefs, newProductsRef];
              },
            },
          });
        },
        onError: (error) => console.log('error', { error }),
      });
    }

    reset(createDefaultValues());
  });

  useEffect(() => {
    if (!editedProduct) return;
    const { __typename, fromBackend, ...product } = editedProduct;
    reset(product);
  }, [editedProduct]);

  return { errors, isDirty, isValid, loading, onSubmit, register, reset };
};

const productValidation = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(128, 'Title cannot exceed 128 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(5000, 'Description cannot exceed 5000 characters'),
  price: yup
    .number()
    .required('Price is required')
    .max(1_000_000, 'Max 1 000 000'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .max(1_000_000, 'Max 1 000 000'),
  active: yup.boolean().required(),
});

type ProductSchema = yup.InferType<typeof productValidation>;
