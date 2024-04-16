import { mockClient } from 'aws-sdk-client-mock';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { catalogBatchProcess } from './handler';
import dbClient from '../../dbClient';
import event from './event.json';

const snsMock = mockClient(SNSClient);

describe('catalogBatchProcess function tests', () => {
  afterEach(() => {
    snsMock.restore();
    jest.clearAllMocks();
  });

  test('should save product in DB and send email notification', async () => {
    jest.spyOn(dbClient, 'createProduct').mockResolvedValue({ $metadata: {} });
    snsMock.on(PublishCommand).resolves({ MessageId: '1' });

    await catalogBatchProcess(event, {} as any, () => {});

    expect(dbClient.createProduct).toHaveBeenCalled();
    expect(snsMock.calls()).toHaveLength(1);
  });
});
