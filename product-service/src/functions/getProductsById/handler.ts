import { APIGatewayEvent } from 'aws-lambda';
import productsMock from '../../__mocks__/products.json';

export const getProductsById = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters;
  const product = productsMock.find((p) => p.id === id);

  if (!product) {
    return {
      statusCode: 404,
      body: `Cannot find product with id ${id}`,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
