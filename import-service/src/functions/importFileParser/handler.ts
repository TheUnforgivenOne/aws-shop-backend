import { S3Client, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';
import { finished } from 'stream';
import { promisify } from 'util';

const BUCKET = 'shop-import-service-bucket';
const asyncFinished = promisify(finished);

export const importFileParser = async (event: S3Event) => {
  try {
    console.log(event);
    const fileKey = event.Records[0].s3.object.key;
    const s3Client = new S3Client({ region: 'eu-west-1' });
    const sqsClient = new SQSClient({ region: 'eu-west-1' });

    const getObject = new GetObjectCommand({ Bucket: BUCKET, Key: fileKey });
    const item = await s3Client.send(getObject);

    const products = [];

    await asyncFinished(
      item.Body.pipe(csv())
        .on('data', (data) => {
          products.push(data);
        })
        .on('end', async () => {
          const copyObject = new CopyObjectCommand({
            CopySource: `${BUCKET}/${fileKey}`,
            Bucket: BUCKET,
            Key: fileKey.replace('uploaded', 'parsed'),
          });
          await s3Client.send(copyObject);

          console.log('file was copied to the "parsed/" folder');

          const deleteObject = new DeleteObjectCommand({ Bucket: BUCKET, Key: fileKey });
          await s3Client.send(deleteObject);

          console.log('original file was deleted from "uploaded/" folder');
        })
    );

    for (let product of products) {
      const message = new SendMessageCommand({
        QueueUrl: process.env.sqsUrl,
        MessageBody: JSON.stringify(product),
      });

      await sqsClient.send(message);
    }

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong, check logs'),
    };
  }
};
