import productsMock from '../../__mocks__/products.json';

export const getProducts = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(productsMock),
  };
};
