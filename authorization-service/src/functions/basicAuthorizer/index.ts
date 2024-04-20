import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

type AWSLambdaType = AWS['functions']['k'];

const basicAuthorizer: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.basicAuthorizer`,
};

export default basicAuthorizer;
