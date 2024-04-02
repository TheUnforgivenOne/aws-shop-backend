import dbClient from '../../dbClient';

export const getProducts = async () => {
  try {
    const { Items: products } = await dbClient.getAllProducts();
    const { Items: stocks } = await dbClient.getAllStocks();

    const response = products.map((product) => ({
      ...product,
      count: stocks.find((stock) => stock.product_id === product.id).count,
    }));

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
