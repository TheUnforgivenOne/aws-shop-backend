import { getProducts } from './handler';
import productsMock from '../../__mocks__/products.json';

describe('getProducts function tests', () => {
  test('should return an array of products', async () => {
    const response = await getProducts();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(productsMock));
  });
});
