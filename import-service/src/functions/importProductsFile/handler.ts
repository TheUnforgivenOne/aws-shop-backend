import { APIGatewayEvent } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const BUCKET = 'shop-import-service-bucket';

export const importProductsFile = async (event: APIGatewayEvent) => {
  try {
    const { name } = event.queryStringParameters;
    const path = `uploaded/${name}`;

    const s3client = new S3Client({ region: 'eu-west-1' });

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: path,
    });

    const signedUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ signedUrl }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify('Something went wrong, check logs'),
    };
  }
};
