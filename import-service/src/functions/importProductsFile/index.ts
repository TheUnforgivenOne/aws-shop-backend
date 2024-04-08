import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

type AWSLambdaType = AWS['functions']['k'];

const importProductsFile: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/import',
      },
    },
  ],
};

export default importProductsFile;
