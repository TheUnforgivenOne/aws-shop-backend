import { APIGatewayEvent } from 'aws-lambda';
import dbClient from '../../dbClient';

export const getProductById = async (event: APIGatewayEvent) => {
  try {
    const { id } = event.pathParameters;

    const { Item: product } = await dbClient.getProductById(id);
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Cannot find product with id ${id}` }),
      };
    }

    const { Item: stock } = await dbClient.getStockById(id);
    if (!stock) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Cannot find stock for product with id ${id}` }),
      };
    }

    const response = { ...product, count: stock.count };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong' }),
    };
  }
};
