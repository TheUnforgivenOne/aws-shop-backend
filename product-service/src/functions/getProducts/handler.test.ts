import dbClient from '../../dbClient';
import { getProducts } from './handler';

const productsMock = {
  $metadata: {},
  Items: [
    {
      id: '0827f2c5-a405-43fa-a85c-124b2f61eeff',
      title: 'Common cat',
      description: 'Common cat description',
      price: 100,
      imgUrl: 'https://i.postimg.cc/nss1hQ2C/Regular.jpg',
    },
  ],
};

const stocksMock = {
  $metadata: {},
  Items: [
    {
      product_id: '0827f2c5-a405-43fa-a85c-124b2f61eeff',
      count: 5,
    },
  ],
};

describe('getProducts function tests', () => {
  test('should return an array of products', async () => {
    jest.spyOn(dbClient, 'getAllProducts').mockResolvedValue(productsMock);
    jest.spyOn(dbClient, 'getAllStocks').mockResolvedValue(stocksMock);

    const response = await getProducts();
    const expectedResult = [
      {
        ...productsMock.Items[0],
        count: stocksMock.Items[0].count,
      },
    ];

    expect(dbClient.getAllProducts).toHaveBeenCalled();
    expect(dbClient.getAllStocks).toHaveBeenCalled();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(expectedResult));
  });
});
