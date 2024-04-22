import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

type AWSLambdaType = AWS['functions']['k'];

const importProductsFile: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
        authorizer: {
          arn: 'arn:aws:lambda:eu-west-1:851725182685:function:authorization-service-dev-basicAuthorizer',
          type: 'token',
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0,
        },
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
      },
    },
  ],
};

export default importProductsFile;
