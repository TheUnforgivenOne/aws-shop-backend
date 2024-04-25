import { handlerPath } from '../../libs/handler-resolver';
import { AWSLambdaType } from '../../types';

const createProduct: AWSLambdaType = {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/products',
      },
    },
  ],
};

export default createProduct;
