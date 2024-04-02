import { getProductById } from './handler';
import event from './event.json';
import productsMock from '../../__mocks__/products.json';

describe('getProductById dunction tests', () => {
  test('getProductById returns product by id', async () => {
    const firstProduct = productsMock[0];
    const requestEvent = { ...event, pathParameters: { id: firstProduct.id } };

    const response = await getProductById(requestEvent);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(firstProduct));
  });

  test('getProductById returns 404 for non-existing product', async () => {
    const wrongProductId = '123'

    const requestEvent = { ...event, pathParameters: { id: wrongProductId } };

    const response = await getProductById(requestEvent);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(`Cannot find product with id ${wrongProductId}`);
  });
});
