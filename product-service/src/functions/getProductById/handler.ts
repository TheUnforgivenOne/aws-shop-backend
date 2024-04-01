import { APIGatewayEvent } from 'aws-lambda';
import * as queries from '@database/queries';

export const getProductById = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters;

  try {
    const { Item: product } = await queries.getProductById(id);
    const { Item: stock } = await queries.getStockById(id);

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Cannot find product with id ${id}` }),
      };
    }

    const res = { ...product, count: stock?.count };

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Something went wrong',
    };
  }
};
