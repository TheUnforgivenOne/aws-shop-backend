import { APIGatewayEvent } from 'aws-lambda';
import { Product, Stock } from '../../types';
import dbClient from '../../dbClient';
import { v4 as uuid } from 'uuid';

export const createProduct = async (event: APIGatewayEvent) => {
  try {
    const params = JSON.parse(event.body);
    const id = uuid();

    const product: Product = {
      id,
      title: params.title,
      description: params.description,
      price: params.price,
      imgUrl: '',
    };

    const stock: Stock = {
      product_id: id,
      count: params.count,
    };

    await dbClient.createProduct(product, stock);

    return {
      status: 200,
      body: JSON.stringify({ message: `"${product.title}" created` }),
    };
  } catch (e) {
    return {
      status: 500,
      body: JSON.stringify({ message: 'Something went wrong' }),
    };
  }
};
