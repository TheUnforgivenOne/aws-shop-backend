import dbClient from '../../dbClient';
import { getProductById } from './handler';
import event from './event.json';

const productMock = {
  $metadata: {},
  Item: {
    id: '0827f2c5-a405-43fa-a85c-124b2f61eeff',
    title: 'Common cat',
    description: 'Common cat description',
    price: 100,
    imgUrl: 'https://i.postimg.cc/nss1hQ2C/Regular.jpg',
  },
};

const stockMock = {
  $metadata: {},
  Item: {
    product_id: '0827f2c5-a405-43fa-a85c-124b2f61eeff',
    count: 5,
  },
};

describe('getProductById dunction tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getProductById returns product by id', async () => {
    jest.spyOn(dbClient, 'getProductById').mockResolvedValue(productMock);
    jest.spyOn(dbClient, 'getStockById').mockResolvedValue(stockMock);

    const requestEvent = { ...event, pathParameters: { id: productMock.Item.id } };
    const response = await getProductById(requestEvent);

    const expectedResult = {
      ...productMock.Item,
      count: stockMock.Item.count,
    };

    expect(dbClient.getProductById).toHaveBeenCalled();
    expect(dbClient.getStockById).toHaveBeenCalled();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(expectedResult));
  });

  test('getProductById returns 404 for non-existing product', async () => {
    jest.spyOn(dbClient, 'getProductById').mockResolvedValue({ ...productMock, Item: undefined });

    const wrongProductId = 'none';

    const requestEvent = { ...event, pathParameters: { id: wrongProductId } };

    const response = await getProductById(requestEvent);

    expect(dbClient.getProductById).toHaveBeenCalled();
    expect(dbClient.getStockById).not.toHaveBeenCalled();
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(JSON.stringify({ message: `Cannot find product with id ${wrongProductId}` }));
  });

  test('getProductById returns 404 when related stock is not found', async () => {
    jest.spyOn(dbClient, 'getProductById').mockResolvedValue(productMock);
    jest.spyOn(dbClient, 'getStockById').mockResolvedValue({ ...stockMock, Item: undefined });

    const requestEvent = { ...event, pathParameters: { id: productMock.Item.id } };
    const response = await getProductById(requestEvent);

    expect(dbClient.getProductById).toHaveBeenCalled();
    expect(dbClient.getStockById).toHaveBeenCalled();
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(
      JSON.stringify({ message: `Cannot find stock for product with id ${productMock.Item.id}` })
    );
  });
});
