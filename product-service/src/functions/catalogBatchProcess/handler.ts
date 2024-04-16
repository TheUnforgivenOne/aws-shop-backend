import { SQSHandler } from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { v4 as uuid } from 'uuid';
import dbClient from 'src/dbClient';
import { Product, Stock } from 'src/types';
import isValidProduct from 'src/utils/isValidProduct';

const snsClient = new SNSClient({ region: 'eu-west-1' });

export const catalogBatchProcess: SQSHandler = async (event) => {
  const results = [];

  for (let record of event.Records) {
    try {
      const params = JSON.parse(record.body);

      if (!isValidProduct(params)) results.push('Product validation error');

      const { count, ...productData } = params;

      const id = uuid();
      const product: Product = { id, ...productData, imgUrl: '' };
      const stock: Stock = { product_id: id, count };

      await dbClient.createProduct(product, stock);

      results.push(`Product ${product.title} imported`);
    } catch (e) {
      console.log(e);
      results.push('Error while import product, check console');
    }
  }

  const message = 'Following products was imported\n' + results.join('\n');

  const pubCommand = new PublishCommand({
    TopicArn: process.env.SNS_TOPIC_ARN,
    Subject: 'Products import',
    Message: message,
  });
  await snsClient.send(pubCommand);
};
