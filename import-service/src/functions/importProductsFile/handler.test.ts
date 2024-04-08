import { S3Client } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { importProductsFile } from './handler';
import event from './event.json';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn().mockResolvedValue('mocked-signed-url'),
}));

const s3Mock = mockClient(S3Client);

describe('importProductsFile function tests', () => {
  beforeEach(() => {
    s3Mock.restore();
  });

  test('function returns signed url', async () => {
    const response = await importProductsFile(event as any);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify({ signedUrl: 'mocked-signed-url' }));
  });
});
