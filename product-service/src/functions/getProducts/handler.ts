import * as queries from '@database/queries';

export const getProducts = async () => {
  try {
    const { Items: products } = await queries.getAllProducts();
    const { Items: stocks } = await queries.getAllStocks();

    const res = products.map((product) => ({
      ...product,
      count: stocks.find((stock) => stock.product_id === product.id)?.count,
    }));

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
