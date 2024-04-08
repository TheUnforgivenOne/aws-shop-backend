import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

type AWSLambdaType = AWS['functions']['k'];

const importFileParser: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'shop-import-service-bucket',
        event: 's3:ObjectCreated:*',
        rules: [{ prefix: 'uploaded/' }, { suffix: '.csv' }],
        existing: true,
      },
    },
  ],
};

export default importFileParser;
