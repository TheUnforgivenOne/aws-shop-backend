import { createProduct } from './handler';
import dbClient from '../../dbClient';
import event from './event.json';

describe('createProduct function tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createProduct dbClient function triggers', async () => {
    jest.spyOn(dbClient, 'createProduct').mockResolvedValue({ $metadata: {} });

    const response = await createProduct(event);

    expect(dbClient.createProduct).toHaveBeenCalled();
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(JSON.stringify({ message: '"New cat" created' }));
  });

  test('returns 400 if validation not passed', async () => {
    jest.spyOn(dbClient, 'createProduct').mockResolvedValue({ $metadata: {} });

    const response = await createProduct({ ...event, body: '{}' });

    expect(dbClient.createProduct).not.toHaveBeenCalled();
    expect(response.status).toEqual(400);
    expect(response.body).toEqual(JSON.stringify({ message: 'Validation error' }));
  });
});
